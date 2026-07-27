import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import qs from 'qs';
import { API_URL, PRIVILEGED_CHANNELS, WS_URL } from '../../config';
import { addMessage } from '../ChatView/actions';
import { changeColor } from '../../containers/StyleProvider/actions';
import { changePreWinner, changePrize } from '../GiveawayRules/actions';
import { changeAnimationDuration } from '../RaffleWrapper/actions';
import { pushUser } from '../UserList/actions';
import ChatView from '../ChatView';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';
import MobileWorkerLayout from './MobileWorkerLayout';
import SuperChat from './SuperChat';
import db from './db';

export const MOBILE_BREAKPOINT = '(max-width: 768px)';

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
  const [superChat, setSuperChat] = useState(null);
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

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
      videoId: props.channel,
      platform: props.platform,
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
    if (PRIVILEGED_CHANNELS.includes(author.id) || chatMessage.isStreamer) {
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
          dispatch(changeAnimationDuration(seconds));
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
  useEffect(() => {
    if (props.channel === 'test') return undefined;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          channel: props.channel,
          platform: props.platform,
        })
      );
    };

    ws.onclose = (event) => {
      if (event.code === 4003) {
        console.warn('Kanał zablokowany:', event.reason);
        if (typeof props.onBlacklisted === 'function') {
          props.onBlacklisted(event.reason);
        }
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Przyszła wiadomość z backendu:', data);
      const badges = data.badges || [];
      const isBot = badges.includes('bot');
      const dbMessage = {
        authorId: data.author,
        displayText: data.message,
        publishedAt: new Date().toISOString(),
        fragments: data.fragments || null,
      };

      const chatViewMessage = {
        userId: data.user_id,
        color: data.color,
        platform: props.platform,
        imageUrl: '',
        badges,
        isStreamer: badges.includes('broadcaster'),
        isSubscriber: data.subscriber > 0,
        title: data.author,
        ...dbMessage,
      };

      dispatch(addMessage(chatViewMessage));

      if (isBot) {
        return;
      }

      if (!(
        dbMessage.displayText === localStorage.getItem('keyword') &&
        localStorage.getItem('gv-saveCommands') !== 'true'
      )) {
        db.table('messages').add(dbMessage);
      }

      const keyword = (localStorage.getItem('keyword') || '').toLowerCase();
      const userListAuthor = {
        id: data.author,
        userId: data.user_id,
        color: data.color,
        platform: props.platform,
        imageUrl: '',
        title: data.author,
        message: data.message,
        badges,
        isModerator: badges.includes('moderator'),
        isStreamer: badges.includes('broadcaster'),
        isSubscriber: data.subscriber > 0,
        subscriptionMonths: data.subscriber,
        isVip: badges.includes('vip'),
        isEligible:
          keyword !== '' && data.message.toLowerCase().includes(keyword),
      };

      dispatch(pushUser(userListAuthor));
      checkResignation(userListAuthor);
      superChatFeatures(userListAuthor, chatViewMessage);
    };

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channel, props.platform, dispatch]);

  return (
    <>
      {isMobile ? (
        <MobileWorkerLayout
          apiKey={props.apiKey}
          channel={props.channel}
          platform={props.platform}
        />
      ) : (
        <ThreeSections>
          <UserList platform={props.platform} />
          <GiveawayRules apiKey={props.apiKey} />
          <ChatView channel={props.channel} platform={props.platform} />
        </ThreeSections>
      )}
      {superChat && (
        <SuperChat
          imageUrl={superChat.imageUrl}
          message={superChat.message}
          title={superChat.title}
        />
      )}
    </>
  );
};

YoutubeWorker.propTypes = {
  apiKey: PropTypes.string.isRequired,
  channel: PropTypes.string,
  onBlacklisted: PropTypes.func,
  platform: PropTypes.string,
};

export default YoutubeWorker;
