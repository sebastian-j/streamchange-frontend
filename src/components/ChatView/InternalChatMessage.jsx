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
    props.$userColor ? props.$userColor : props.theme.secondaryTextColor};
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

const EmoteImg = styled.img`
  height: 24px;
  vertical-align: middle;
  margin: 0 2px;
`;

const renderMessageBody = (message) => {
  if (Array.isArray(message.fragments) && message.fragments.length > 0) {
    return message.fragments.map((fragment, index) =>
      fragment.type === 'emote' && fragment.url ? (
        <EmoteImg
          key={index}
          src={fragment.url}
          alt={fragment.code}
          title={fragment.code}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span key={index}>{fragment.text || fragment.code}</span>
      )
    );
  }

  return message.displayText;
};

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
        <AuthorTitle $userColor={userColor}>{props.message.title}</AuthorTitle>
      </Tooltip>
      <MessageText>{renderMessageBody(props.message)}</MessageText>
    </MessageLi>
  );
};

InternalChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default InternalChatMessage;
