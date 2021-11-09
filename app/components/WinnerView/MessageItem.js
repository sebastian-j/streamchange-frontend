import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageLi = styled.li`
  margin-bottom: 5px;
`;

const MessageDate = styled.span`
  color: ${(props) => props.theme.secondaryTextColor};
  margin-right: 10px;
`;
const MessageText = styled.span`
  color: ${(props) => props.theme.staticTextColor};
`;

function MessageItem(props) {
  const dt = new Date(props.date);
  const convertedDate = `${dt.getHours()}:${
    dt.getMinutes() < 10 ? '0' : ''
  }${dt.getMinutes()}:${dt.getSeconds() < 10 ? '0' : ''}${dt.getSeconds()}`;
  return (
    <MessageLi>
      <MessageDate>{convertedDate}</MessageDate>
      <MessageText>{props.text}</MessageText>
    </MessageLi>
  );
}

MessageItem.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MessageItem;
