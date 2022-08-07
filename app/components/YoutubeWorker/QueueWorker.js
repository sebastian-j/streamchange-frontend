import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { API_URL, PRIVILEGED_CHANNELS } from '../../config';
import { addMessage } from '../ChatView/actions';
import { changeColor } from '../../containers/StyleProvider/actions';
import {
  deleteQueueItem,
  pushQueueItem,
  updateQueueItem,
} from '../../containers/QueuePage/actions';
import ChatView from '../ChatView';
import QueueColumn from '../../containers/QueuePage/QueueColumn';
import QueueRules from '../../containers/QueuePage/QueueRules';
import SuperChat from './SuperChat';

const ThreeSections = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  display: flex;
  flex-direction: row;
  height: 95vh;
  @media (orientation: portrait) {
    flex-direction: column;
    height: unset;
  }
`;

const QueueWorker = (props) => {
  const [timer, setTimer] = useState(null);
  const [superChat, setSuperChat] = useState(null);

  const saveMessage = (msg) => {
    const chatViewMessage = {
      authorId: msg.a.id,
      displayText: msg.s.m,
      imageUrl: msg.a.img,
      isModerator: msg.a.isChatModerator,
      isOwner: msg.a.isChatOwner,
      isVerified: msg.a.isVerified,
      publishedAt: msg.s.publishedAt,
      title: msg.a.n,
    };
    props.addMessage(chatViewMessage);
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
            '',
          )}`,
        });
        props.onColorChange(author.message.replace('!color ', ''));
        setTimeout(() => setSuperChat(null), 10000);
      }
    }
  };

  const checkResignation = (author) => {
    if (
      localStorage.getItem('gv-abortCommand') !== null &&
      author.message === localStorage.getItem('gv-abortCommand')
    ) {
      props.deleteItem(author.id);
    }
  };

  const messageProcessor = () => {
    let nextPageToken = localStorage.getItem('nextPageToken');
    if (nextPageToken === null) {
      nextPageToken = ' ';
    }
    axios
      .get(
        `${API_URL}/v4/m?maxResults=200&id=${props.videoId}&pageToken=${nextPageToken}`,
      )
      .then((res) => {
        localStorage.setItem('nextPageToken', res.data.tag);
        for (let i = 0; i < res.data.items.length; i += 1) {
          const author = {
            id: res.data.items[i].a.id,
            imageUrl: res.data.items[i].a.img,
            title: res.data.items[i].a.n,
            message: res.data.items[i].s.m,
            addedAt: res.data.items[i].s.publishedAt,
            lastActiveAt: res.data.items[i].s.publishedAt,
          };
          const isEligible = res.data.items[i].s.m
            .toLowerCase()
            .includes(localStorage.getItem('queue-command').toLowerCase());
          author.message = author.message.replace(
            localStorage.getItem('queue-command'),
            '',
          );
          if (isEligible) props.pushItem(author);
          else {
            delete author.message;
            delete author.addedAt;
            props.updateItem(author);
          }
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
    clearTimeout(timer);
  }, []);

  return (
    <ThreeSections>
      <QueueColumn />
      <QueueRules />
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

QueueWorker.propTypes = {
  addMessage: PropTypes.func.isRequired,
  deleteItem: PropTypes.func,
  onColorChange: PropTypes.func,
  pushItem: PropTypes.func,
  updateItem: PropTypes.func,
  videoId: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    addMessage: (m) => dispatch(addMessage(m)),
    deleteItem: (id) => dispatch(deleteQueueItem(id)),
    onColorChange: (col) => dispatch(changeColor(col)),
    pushItem: (item) => dispatch(pushQueueItem(item)),
    updateItem: (item) => dispatch(updateQueueItem(item)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(QueueWorker);
