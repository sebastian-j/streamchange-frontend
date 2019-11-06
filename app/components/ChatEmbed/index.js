import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ChatEmbed(props) {
  return (
    <div className="gv-column">
      <h2 className="column-title">Chat</h2>
      <iframe
        className="chat-frame"
        title="Youtube Chat"
        src={`https://www.youtube.com/live_chat?v=${
          props.videoId
        }&embed_domain=${window.location.hostname}`}
      />
    </div>
  );
}

ChatEmbed.propTypes = {
  videoId: PropTypes.string,
};

export default ChatEmbed;
