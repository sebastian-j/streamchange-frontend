import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/Menu';
import { FormattedMessage } from 'react-intl';

import ChatEmbed from './ChatEmbed';
import InternalChat from './InternalChat';
import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';
import messages from './messages';

const ThemedSvg = styled.svg`
  color: ${(props) => props.theme.staticTextColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

function ChatView(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatMode, setChatMode] = useState(0);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index) => {
    setChatMode(index);
    closeMenu();
  };

  return (
    <Panel className="chat">
      <Header>
        <PanelTitle>
          <FormattedMessage {...messages.panelTitle} />
        </PanelTitle>
        <IconButton edge="end" aria-label="Options" onClick={openMenu}>
          <ThemedSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18px"
            height="18px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </ThemedSvg>
        </IconButton>
        <MenuList
          id="simple-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={closeMenu}
        >
          <MenuItem onClick={() => handleMenuItemClick(0)}>
            <ListItemIcon>
              {chatMode === 0 && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.embedMode} />
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick(1)}>
            <ListItemIcon>
              {chatMode === 1 && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.internalMode} />
          </MenuItem>
        </MenuList>
      </Header>
      {chatMode === 0 && <ChatEmbed videoId={props.videoId} />}
      {chatMode === 1 && <InternalChat />}
    </Panel>
  );
}

ChatView.propTypes = {
  videoId: PropTypes.string,
};

export default ChatView;
