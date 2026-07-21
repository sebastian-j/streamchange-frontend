import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChatFrame = styled.iframe`
  border: none;
  height: calc(100% - 67px);
  width: 100%;
`;

export function ChatEmbed(props) {
  if (props.channel === 'test') return <div />;

  const channel = encodeURIComponent(props.channel);

  if (props.platform === 'twitch') {
    const theme = props.isDarkMode ? '&darkpopout' : '';
    return (
      <ChatFrame
        className="chat-frame"
        title="Twitch Chat"
        src={`https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}${theme}`}
      />
    );
  }

  return (
    <ChatFrame
      className="chat-frame"
      title="Kick Chat"
      src={`https://chat.kick.cx/embed/${channel}`}
    />
  );
}

ChatEmbed.propTypes = {
  channel: PropTypes.string,
  platform: PropTypes.string,
  isDarkMode: PropTypes.bool,
};

export default ChatEmbed;
