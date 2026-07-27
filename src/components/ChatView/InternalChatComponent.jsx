import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useInjectReducer } from '../../utils/injectReducer';
import InternalChatMessage from './InternalChatMessage';
import reducer from './reducer';

const ItemScroller = styled.ol`
  height: 92%;
  list-style: none;
  overflow-anchor: none;
  overflow-y: scroll;
  padding-left: 0;
`;

export const InternalChat = (props) => {
  const scrollerRef = useRef(null);
  const isFirstRender = useRef(true);
  useInjectReducer({ key: 'chat', reducer });

  const scrollToBottom = (behavior) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      scrollToBottom('auto');
      return;
    }

    const scroller = scrollerRef.current;
    const isNearBottom =
      scroller &&
      scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 100;

    if (isNearBottom) {
      scrollToBottom('smooth');
    }
  }, [props.messages]);

  return (
    <ItemScroller ref={scrollerRef}>
      {props.messages.map((message) => (
        <InternalChatMessage key={message.publishedAt} message={message} />
      ))}
    </ItemScroller>
  );
};

InternalChat.propTypes = {
  messages: PropTypes.array,
};

export default InternalChat;
