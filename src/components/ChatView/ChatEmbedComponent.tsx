import styled from 'styled-components';

const ChatFrame = styled.iframe`
  border: none;
  height: calc(100% - 67px);
  width: 100%;
`;

type ChatEmbedProps = {
  channel: string;
  platform: string;
  isDarkMode: boolean;
};

export function ChatEmbed(props: ChatEmbedProps) {
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

export default ChatEmbed;
