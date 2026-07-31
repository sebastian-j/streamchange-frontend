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
  if (props.platform === 'youtube') {
    return (
      <ChatFrame
        className="chat-frame"
        title="Youtube Chat"
        src={`https://www.youtube.com/live_chat?v=${props.videoId}&embed_domain=${window.location.hostname}`}
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
  videoId: PropTypes.string,
  isDarkMode: PropTypes.bool,
};

export default ChatEmbed;
