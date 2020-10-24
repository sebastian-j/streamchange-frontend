import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { API_URL, PRIVILEGED_CHANNELS } from '../../config';
import ChatEmbed from '../ChatEmbed';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';
import SuperChat from './SuperChat';
import db from './db';

const ThreeSections = styled.div`
  background-color: ${props => props.theme.bodyBackground};
  display: flex;
  flex-direction: row;
  height: 95vh;
`;

const YoutubeWorker = props => {
  const [timer, setTimer] = useState(null);
  const [superChat, setSuperChat] = useState(null);

  const messageProcessor = () => {
    let nextPageToken = localStorage.getItem('nextPageToken');
    if (nextPageToken === null) {
      nextPageToken = ' ';
    }
    axios
      .get(
        `${API_URL}/v4/liveChat/messages?part=snippet,authorDetails&maxResults=200&id=${
          props.videoId
        }&pageToken=${nextPageToken}`,
      )
      .then(res => {
        localStorage.setItem('nextPageToken', res.data.nextPageToken);
        for (let i = 0; i < res.data.items.length; i += 1) {
          const author = {
            id: res.data.items[i].authorDetails.channelId,
            imageUrl: res.data.items[i].authorDetails.profileImageUrl,
            title: res.data.items[i].authorDetails.displayName,
            message: res.data.items[i].snippet.displayMessage,
            isModerator: res.data.items[i].authorDetails.isChatModerator,
            isSponsor: res.data.items[i].authorDetails.isChatSponsor,
            isEligible: res.data.items[i].snippet.displayMessage.includes(
              localStorage.getItem('keyword'),
            ),
          };
          db.users
            .where('id')
            .equals(author.id)
            .first()
            .then(user => {
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
          if (
            (PRIVILEGED_CHANNELS.includes(author.id) ||
              res.data.items[i].authorDetails.isChatOwner) &&
            author.message.startsWith('!s ')
          ) {
            setSuperChat({
              title: author.title,
              imageUrl: author.imageUrl,
              message: author.message.replace('!s ', ''),
            });
            setTimeout(
              () => setSuperChat(null),
              6000 + author.message.length * 30,
            );
          }
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

  const saveMessage = msg => {
    const message = {
      authorId: msg.authorDetails.channelId,
      displayText: msg.snippet.displayMessage,
      publishedAt: msg.snippet.publishedAt,
    };
    if (
      message.displayText === localStorage.getItem('keyword') &&
      localStorage.getItem('gv-saveCommands') !== 'true'
    ) {
      return;
    }
    db.table('messages').add(message);
  };

  const checkResignation = author => {
    if (
      localStorage.getItem('gv-abortCommand') !== null &&
      author.message === localStorage.getItem('gv-abortCommand')
    ) {
      db.table('users')
        .where('id')
        .equals(author.id)
        .modify({
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
      <ChatEmbed videoId={props.videoId} />
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
