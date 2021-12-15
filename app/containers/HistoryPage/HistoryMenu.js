import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/Menu';

import messages from './messages';
import db from '../../components/YoutubeWorker/db';

const ThemedSvg = styled.svg`
  color: ${(props) => props.theme.staticTextColor};
`;

const HistoryMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openDialog = () => {
    setAnchorEl(null);
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const clearHistory = () => {
    db.history.clear().then(() => props.onClear());
    closeDialog();
  };

  return (
    <div>
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
        <MenuItem onClick={openDialog}>
          <FormattedMessage {...messages.clearHistoryMenuItem} />
        </MenuItem>
      </MenuList>
      <Dialog
        open={isOpenDialog}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.clearHistoryMenuItem} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage {...messages.clearHistoryDialogContent} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            <FormattedMessage {...messages.clearHistoryCancelButton} />
          </Button>
          <Button onClick={clearHistory} color="primary">
            <FormattedMessage {...messages.clearHistoryConfirmButton} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

HistoryMenu.propTypes = {
  onClear: PropTypes.func,
};

export default HistoryMenu;
