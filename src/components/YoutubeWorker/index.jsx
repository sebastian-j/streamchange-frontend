import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { API_URL, PRIVILEGED_CHANNELS } from '../../config';
import { addMessage } from '../ChatView/actions';
import { changeColor } from '../../containers/StyleProvider/actions';
import { changePreWinner, changePrize } from '../GiveawayRules/actions';
import { changeAnimationDuration } from '../RaffleWrapper/actions';
import { pushUser } from '../UserList/actions';
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
  @media (orientation: portrait) {
    flex-direction: column;
    height: auto;
  }
`;

const YoutubeWorker = (props) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [superChat, setSuperChat] = useState(null);

  const saveMessage = (msg) => {
    const dbMessage = {
      authorId: msg.a.id,
      displayText: msg.s.m,
      publishedAt: msg.s.publishedAt,
    };
    const chatViewMessage = {
      imageUrl: msg.a.img,
      isModerator: msg.a.isChatModerator,
      isOwner: msg.a.isChatOwner,
      isSponsor: msg.a.isChatSponsor,
      isVerified: msg.a.isVerified,
      title: msg.a.n,
      ...dbMessage,
    };
    dispatch(addMessage(chatViewMessage));
    if (
      dbMessage.displayText === localStorage.getItem('keyword') &&
      localStorage.getItem('gv-saveCommands') !== 'true'
    ) {
      return;
    }
    db.table('messages').add(dbMessage);
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
          dispatch(changePreWinner(author));
          db.messages
            .filter(
              (message) =>
                message.authorId === author.id &&
                message.displayText === author.message
            )
            .delete();
        }
      })
      .catch(() => {});
  };

  const superChatFeatures = (author, chatMessage) => {
    if (PRIVILEGED_CHANNELS.includes(author.id) || chatMessage.a.isChatOwner) {
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
            ''
          )}`,
        });
        dispatch(changeColor(author.message.replace('!color ', '')));
        setTimeout(() => setSuperChat(null), 10000);
      } else if (author.message.startsWith('!time ')) {
        const seconds = Number(author.message.replace('!time ', ''));
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${author.title} changed animation duration to ${seconds}`,
        });
        setTimeout(() => setSuperChat(null), 10000);
        if (!Number.isNaN(seconds) && seconds > 0 && seconds < 601) {
          dispatch(changeAnimationDuration(
            Number(author.message.replace('!time ', ''))
          ));
        }
      } else if (author.message.startsWith('!prize ')) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${author.title} changed prize to ${author.message.replace(
            '!prize ',
            ''
          )}`,
        });
        dispatch(changePrize(author.message.replace('!prize ', '')));
        setTimeout(() => setSuperChat(null), 10000);
      }
      checkPreWinner(author);
    }
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

  const messageProcessor = () => {
    let nextPageToken = localStorage.getItem('nextPageToken');
    if (nextPageToken === null) {
      nextPageToken = ' ';
    }
    axios
      .get(
        `${API_URL}/v4/m?maxResults=200&id=${props.videoId}&pageToken=${nextPageToken}`
      )
      .then((res) => {
        localStorage.setItem('nextPageToken', res.data.tag);
        for (let i = 0; i < res.data.items.length; i += 1) {
          const author = {
            id: res.data.items[i].a.id,
            imageUrl: res.data.items[i].a.img,
            title: res.data.items[i].a.n,
            message: res.data.items[i].s.m,
            isModerator: res.data.items[i].a.isChatModerator,
            isSponsor: res.data.items[i].a.isChatSponsor
              ? res.data.items[i].a.sponsorBadge
              : false,
            isVerified: res.data.items[i].a.isVerified,
            isEligible: res.data.items[i].s.m
              .toLowerCase()
              .includes(localStorage.getItem('keyword').toLowerCase()),
          };
          dispatch(pushUser(author));
          checkResignation(author);
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

  useEffect(() => {
    if (props.videoId !== 'test') messageProcessor();
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
  videoId: PropTypes.string,
};

export default YoutubeWorker;
