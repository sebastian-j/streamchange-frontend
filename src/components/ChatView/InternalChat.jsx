import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import InternalChatMessage from './InternalChatMessage';
import { makeSelectMessages } from './selectors';
import reducer from './reducer';

const ItemScroller = styled.ol`
  height: 92%;
  list-style: none;
  overflow-anchor: none;
  overflow-y: scroll;
  padding-left: 0;
`;

const ScrollerEnd = styled.div`
  clear: both;
`;

export const InternalChat = (props) => {
  let messagesEndRef = useRef(null);
  const scrollerRef = useRef(null);
  const isFirstRender = useRef(true);
  useInjectReducer({ key: 'chat', reducer });

  const scrollToBottom = () => {
    messagesEndRef.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      scrollToBottom();
      return;
    }

    const scroller = scrollerRef.current;
    const isNearBottom =
      scroller &&
      scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 100;

    if (isNearBottom) {
      scrollToBottom();
    }
  }, [props.messages]);

  return (
    <ItemScroller ref={scrollerRef}>
      {props.messages.map((message) => (
        <InternalChatMessage key={message.publishedAt} message={message} />
      ))}
      <ScrollerEnd
        ref={(el) => {
          messagesEndRef = el;
        }}
      />
    </ItemScroller>
  );
};

InternalChat.propTypes = {
  messages: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
});

export default connect(mapStateToProps, null)(InternalChat);
