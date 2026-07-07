import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChatFrame = styled.iframe`
  border: none;
  height: calc(100% - 67px);
  width: 100%;
`;

function ChatEmbed(props) {
  if (props.channel === 'test') return <div />;

  const channel = encodeURIComponent(props.channel);

  if (props.platform === 'twitch') {
    return (
      <ChatFrame
        className="chat-frame"
        title="Twitch Chat"
        src={`https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}&darkpopout`}
      />
    );
  }

  return (
    <ChatFrame
      className="chat-frame"
      title="Kick Chat"
      src={`https://chat.kick.cx/embed/${channel}?readonly=true`}
    />
  );
}

ChatEmbed.propTypes = {
  channel: PropTypes.string,
  platform: PropTypes.string,
};

export default ChatEmbed;