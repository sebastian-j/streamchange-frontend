import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';

const ChatFrame = styled.iframe`
  border: none;
  height: calc(100% - 67px);
  width: 100%;
`;

function ChatEmbed(props) {
  return (
    <Panel>
      <PanelTitle>Czat</PanelTitle>
      <ChatFrame
        className="chat-frame"
        title="Youtube Chat"
        src={`https://www.youtube.com/live_chat?v=${
          props.videoId
        }&embed_domain=${window.location.hostname}`}
      />
    </Panel>
  );
}

ChatEmbed.propTypes = {
  videoId: PropTypes.string,
};

export default ChatEmbed;
