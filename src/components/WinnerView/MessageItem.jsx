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
  overflow-wrap: anywhere;
`;

const EmoteImg = styled.img`
  height: 24px;
  vertical-align: middle;
  margin: 0 2px;
`;

const renderMessageBody = (fragments, text) => {
  if (Array.isArray(fragments) && fragments.length > 0) {
    return fragments.map((fragment, index) =>
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

  return text;
};

function MessageItem(props) {
  const dt = new Date(props.date);
  const convertedDate = `${dt.getHours()}:${
    dt.getMinutes() < 10 ? '0' : ''
  }${dt.getMinutes()}:${dt.getSeconds() < 10 ? '0' : ''}${dt.getSeconds()}`;
  return (
    <MessageLi>
      <MessageDate>{convertedDate}</MessageDate>
      <MessageText>
        {renderMessageBody(props.fragments, props.text)}
      </MessageText>
    </MessageLi>
  );
}

MessageItem.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  fragments: PropTypes.arrayOf(PropTypes.object),
};

export default MessageItem;
