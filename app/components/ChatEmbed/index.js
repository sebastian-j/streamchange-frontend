import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';
import messages from './messages';

const ChatFrame = styled.iframe`
  border: none;
  height: calc(100% - 67px);
  width: 100%;
`;

function ChatEmbed(props) {
  return (
    <Panel>
      <PanelTitle>
        <FormattedMessage {...messages.panelTitle} />
      </PanelTitle>
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
