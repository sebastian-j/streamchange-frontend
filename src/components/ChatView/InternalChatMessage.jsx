import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

import InternalChatBadges from './InternalChatBadges';

const MessageLi = styled.li`
  margin-bottom: 5px;
`;

const AuthorImage = styled.img`
  border-radius: 50%;
  height: 26px;
  margin-right: 5px;
`;

const AuthorTitle = styled.span`
  color: ${(props) =>
    props.userColor ? props.userColor : props.theme.secondaryTextColor};
  font-family: Roboto, sans-serif;
  font-weight: 500;
  margin-right: 5px;
  .moderator {
    color: rgb(94, 132, 241);
  }
`;
const MessageText = styled.span`
  color: ${(props) => props.theme.staticTextColor};
`;

const InternalChatMessage = (props) => {
  const userColor = props.message.color || null;
  const dt = new Date(props.message.publishedAt);
  const convertedDate = `${dt.getHours()}:${
    dt.getMinutes() < 10 ? '0' : ''
  }${dt.getMinutes()}:${dt.getSeconds() < 10 ? '0' : ''}${dt.getSeconds()}`;

  return (
    <MessageLi>
      <InternalChatBadges message={props.message} />
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
