import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { API_URL, PRIVILEGED_CHANNELS } from '../../config';
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
  const timerRef = useRef(null);
  const [superChat, setSuperChat] = useState(null);

  const saveMessage = (msg) => {
    const badges = [];
    if (msg.a.isChatOwner) badges.push('broadcaster');
    if (msg.a.isChatModerator) badges.push('moderator');
    if (msg.a.isVerified) badges.push('certified');

    const chatViewMessage = {
      authorId: msg.a.id,
      displayText: msg.s.m,
      imageUrl: msg.a.img,
      badges,
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
            ''
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
            addedAt: res.data.items[i].s.publishedAt,
            lastActiveAt: res.data.items[i].s.publishedAt,
          };
          const isEligible = res.data.items[i].s.m
            .toLowerCase()
            .includes(localStorage.getItem('queue-command').toLowerCase());
          author.message = author.message.replace(
            localStorage.getItem('queue-command'),
            ''
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
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(
          messageProcessor,
          res.data.pollingIntervalMillis
        );
      })
      .catch(() => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(messageProcessor, 6000);
      });
  };

  const messageProcessorRef = useRef(messageProcessor);
  const videoIdRef = useRef(props.videoId);

  useEffect(() => {
    if (videoIdRef.current !== 'test') messageProcessorRef.current();
    clearTimeout(timerRef.current);
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

export default QueueWorker;
