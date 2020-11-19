import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { API_URL, PRIVILEGED_CHANNELS } from '../../config';
import { changeColor } from '../../containers/StyleProvider/actions';
import {
  deleteQueueItem,
  pushQueueItem,
  updateQueueItem,
} from '../../containers/QueuePage/actions';
import ChatEmbed from '../ChatEmbed';
import QueueColumn from '../../containers/QueuePage/QueueColumn';
import QueueRules from '../../containers/QueuePage/QueueRules';
import SuperChat from './SuperChat';
import db from './db';

const ThreeSections = styled.div`
  background-color: ${props => props.theme.bodyBackground};
  display: flex;
  flex-direction: row;
  height: 95vh;
`;

const QueueWorker = props => {
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
            addedAt: res.data.items[i].snippet.publishedAt,
            lastActiveAt: res.data.items[i].snippet.publishedAt,
          };
          const isEligible = res.data.items[i].snippet.displayMessage
            .toLowerCase()
            .includes(localStorage.getItem('queue-command').toLowerCase());
          author.message = author.message.replace(
            localStorage.getItem('queue-command'),
            ' ',
          );
          db.queue
            .where('id')
            .equals(author.id)
            .first()
            .then(user => {
              if (user === undefined && isEligible) {
                db.table('queue')
                  .toArray()
                  .then(items => {
                    if (
                      items.length <
                      parseInt(localStorage.getItem('queue-capacity'), 10)
                    ) {
                      props.pushItem(author);
                    }
                  });
              } else if (typeof user !== 'undefined') {
                props.updateItem(author);
              }
            });
          checkResignation(author);
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
      }
    }
  };

  const checkResignation = author => {
    if (
      localStorage.getItem('gv-abortCommand') !== null &&
      author.message === localStorage.getItem('gv-abortCommand')
    ) {
      props.deleteItem(author.id);
    }
  };

  useEffect(() => {
    messageProcessor();
    clearTimeout(timer);
  }, []);

  return (
    <ThreeSections>
      <QueueColumn />
      <QueueRules />
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

QueueWorker.propTypes = {
  deleteItem: PropTypes.func,
  onColorChange: PropTypes.func,
  pushItem: PropTypes.func,
  updateItem: PropTypes.func,
  videoId: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    deleteItem: id => dispatch(deleteQueueItem(id)),
    onColorChange: col => dispatch(changeColor(col)),
    pushItem: item => dispatch(pushQueueItem(item)),
    updateItem: item => dispatch(updateQueueItem(item)),
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(QueueWorker);
