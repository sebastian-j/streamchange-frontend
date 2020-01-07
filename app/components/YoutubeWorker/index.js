import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ChatEmbed from '../ChatEmbed';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';
import db from './db';
import './style.css';

const YoutubeWorker = props => {
  const [timer, setTimer] = useState(null);

  const messageProcessor = () => {
    let nextPageToken = localStorage.getItem('nextPageToken');
    if (nextPageToken === null) {
      nextPageToken = ' ';
    }
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&maxResults=200&liveChatId=${
          props.liveChatId
        }&pageToken=${nextPageToken}&key=${props.apiKey}`,
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
        }
        clearTimeout(timer);
        setTimer(null);
        setTimer(setTimeout(messageProcessor, res.data.pollingIntervalMillis));
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
  }, [props.liveChatId]);

  return (
    <div className="three-sections">
      <UserList />
      <GiveawayRules apiKey={props.apiKey} channelId={props.channelId} />
      <ChatEmbed videoId={props.videoId} />
    </div>
  );
};

YoutubeWorker.propTypes = {
  apiKey: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  liveChatId: PropTypes.string.isRequired,
};

export default YoutubeWorker;
