import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

const MessageLi = styled.li`
  margin-bottom: 5px;
`;

const AuthorImage = styled.img`
  border-radius: 50%;
  height: 26px;
  margin-right: 5px;
`;

const AuthorTitle = styled.span`
  color: ${props =>
    props.userColor ? props.userColor : props.theme.secondaryTextColor};
  font-family: Roboto, sans-serif;
  font-weight: 500;
  margin-right: 5px;
  .moderator {
    color: rgb(94, 132, 241);
  }
`;
const MessageText = styled.span`
  color: ${props => props.theme.staticTextColor};
`;

const InternalChatMessage = props => {
  let userColor = props.message.isSponsor ? 'rgb(43,166,64)' : null;
  userColor = props.message.isModerator ? 'rgb(94, 132, 241)' : userColor;
  userColor = props.message.isOwner ? 'rgb(255, 214, 0)' : userColor;
  const dt = new Date(props.message.publishedAt);
  const convertedDate = `${dt.getHours()}:${
    dt.getMinutes() < 10 ? '0' : ''
  }${dt.getMinutes()}:${dt.getSeconds() < 10 ? '0' : ''}${dt.getSeconds()}`;

  return (
    <MessageLi>
      <a
        href={`https://www.youtube.com/channel/${props.message.authorId}`}
        target="_blank"
      >
        <AuthorImage src={props.message.imageUrl} />
      </a>
      <Tooltip title={convertedDate} aria-label="date">
        <AuthorTitle userColor={userColor}>{props.message.title}</AuthorTitle>
      </Tooltip>
      <MessageText>{props.message.displayText}</MessageText>
    </MessageLi>
  );
};

InternalChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default InternalChatMessage;
