import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components';

import { API_URL, PRIVILEGED_CHANNELS } from '../../config';
import { makeSelectColor } from '../../containers/StyleProvider/selectors';
import { addMessage } from '../ChatView/actions';
import { changeColor } from '../../containers/StyleProvider/actions';
import { changePreWinner, changePrize } from '../GiveawayRules/actions';
import { changeAnimationDuration } from '../RaffleWrapper/actions';
import ChatView from '../ChatView';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';
import SuperChat from './SuperChat';
import db from './db';

const ThreeSections = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  display: flex;
  flex-direction: row;
  height: 95vh;
`;

const YoutubeWorker = (props) => {
  const [timer, setTimer] = useState(null);
  const [superChat, setSuperChat] = useState(null);

  const messageProcessor = () => {
    let nextPageToken = localStorage.getItem('nextPageToken');
    if (nextPageToken === null) {
      nextPageToken = ' ';
    }
    axios
      .get(
        `${API_URL}/v4/liveChat/messages?part=snippet,authorDetails&maxResults=200&id=${props.videoId}&pageToken=${nextPageToken}`,
      )
      .then((res) => {
        localStorage.setItem('nextPageToken', res.data.nextPageToken);
        for (let i = 0; i < res.data.items.length; i += 1) {
          const author = {
            id: res.data.items[i].authorDetails.channelId,
            imageUrl: res.data.items[i].authorDetails.profileImageUrl,
            title: res.data.items[i].authorDetails.displayName,
            message: res.data.items[i].snippet.displayMessage,
            isModerator: res.data.items[i].authorDetails.isChatModerator,
            isSponsor: res.data.items[i].authorDetails.isChatSponsor,
            isEligible: res.data.items[i].snippet.displayMessage
              .toLowerCase()
              .includes(localStorage.getItem('keyword').toLowerCase()),
          };
          db.users
            .where('id')
            .equals(author.id)
            .first()
            .then((user) => {
              if (user === undefined) {
                db.table('users').add(author);
              } else {
                db.table('users')
                  .where('id')
                  .equals(author.id)
                  .modify({
                    message: author.isEligible ? author.message : user.message,
                    isEligible:
                      user.isEligible === true ? true : author.isEligible,
                  })
                  .then(() => {
                    checkResignation(author);
                  });
              }
            });
          saveMessage(res.data.items[i]);
          superChatFeatures(author, res.data.items[i]);
        }
        clearTimeout(timer);
        setTimer(null);
        setTimer(setTimeout(messageProcessor, res.data.pollingIntervalMillis));
      })
      .catch(() => {
        clearTimeout(timer);
        setTimer(null);
        setTimer(setTimeout(messageProcessor, 6000));
      });
  };

  const saveMessage = (msg) => {
    const dbMessage = {
      authorId: msg.authorDetails.channelId,
      displayText: msg.snippet.displayMessage,
      publishedAt: msg.snippet.publishedAt,
    };
    const chatViewMessage = {
      imageUrl: msg.authorDetails.profileImageUrl,
      isModerator: msg.authorDetails.isChatModerator,
      isOwner: msg.authorDetails.isChatOwner,
      isVerified: msg.authorDetails.isVerified,
      title: msg.authorDetails.displayName,
      ...dbMessage,
    };
    props.addMessage(chatViewMessage);
    if (
      dbMessage.displayText === localStorage.getItem('keyword') &&
      localStorage.getItem('gv-saveCommands') !== 'true'
    ) {
      return;
    }
    db.table('messages').add(dbMessage);
  };

  const superChatFeatures = (author, chatMessage) => {
    if (
      PRIVILEGED_CHANNELS.includes(author.id) ||
      chatMessage.authorDetails.isChatOwner
    ) {
      if (author.message.startsWith('!s ')) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: author.message.replace('!s ', ''),
        });
        setTimeout(() => setSuperChat(null), 6000 + author.message.length * 30);
      } else if (author.message.startsWith('!color ')) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${author.title} changed color to ${author.message.replace(
            '!color ',
            '',
          )}`,
        });
        props.onColorChange(author.message.replace('!color ', ''));
        setTimeout(() => setSuperChat(null), 10000);
      } else if (author.message.startsWith('!time ')) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${
            author.title
          } changed animation duration to ${author.message.replace(
            '!time ',
            '',
          )}`,
        });
        props.changeAnimationDuration(
          Number(author.message.replace('!time ', '')),
        );
        setTimeout(() => setSuperChat(null), 10000);
      } else if (author.message.startsWith('!prize ')) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${author.title} changed prize to ${author.message.replace(
            '!prize ',
            '',
          )}`,
        });
        props.changePrize(author.message.replace('!prize ', ''));
        setTimeout(() => setSuperChat(null), 10000);
      }
      checkPreWinner(author);
    }
  };

  const checkPreWinner = (author) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const data = {
      channelId: author.id,
      displayName: author.title,
      message: author.message,
      videoId: props.videoId,
    };
    axios
      .post(`${API_URL}/v4/bwin`, qs.stringify(data), config)
      .then((res) => {
        if (res.data && res.data.bwin && res.data.bwin === 'yes') {
          props.changePreWinner(author);
        }
      })
      .catch(() => {});
  };

  const checkResignation = (author) => {
    if (
      localStorage.getItem('gv-abortCommand') !== null &&
      author.message === localStorage.getItem('gv-abortCommand')
    ) {
      db.table('users').where('id').equals(author.id).modify({
        isEligible: false,
      });
    }
  };

  useEffect(() => {
    messageProcessor();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThreeSections>
      <UserList />
      <GiveawayRules apiKey={props.apiKey} />
      <ChatView videoId={props.videoId} />
      {superChat && (
        <SuperChat
          imageUrl={superChat.imageUrl}
          message={superChat.message}
          title={superChat.title}
        />
      )}
    </ThreeSections>
  );
};

YoutubeWorker.propTypes = {
  apiKey: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  changeAnimationDuration: PropTypes.func,
  changePreWinner: PropTypes.func,
  changePrize: PropTypes.func,
  onColorChange: PropTypes.func,
  videoId: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectColor(), (themeColor) => ({
  themeColor,
}));

export function mapDispatchToProps(dispatch) {
  return {
    addMessage: (m) => dispatch(addMessage(m)),
    changeAnimationDuration: (t) => dispatch(changeAnimationDuration(t)),
    changePreWinner: (w) => dispatch(changePreWinner(w)),
    changePrize: (str) => dispatch(changePrize(str)),
    onColorChange: (col) => dispatch(changeColor(col)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeWorker);
