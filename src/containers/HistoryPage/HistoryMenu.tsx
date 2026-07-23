import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import messages from './messages';
import db from '../../components/YoutubeWorker/db';

interface Props {
  onClear: () => void;
}

const HistoryMenu = ({ onClear }: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const clearHistory = () => {
    db.table('history')
      .clear()
      .then(() => onClear());
    closeDialog();
  };

  return (
    <div>
      <Button onClick={openDialog} color="error">
        <FormattedMessage {...messages.clearHistoryMenuItem} />
      </Button>
      <Dialog
        open={isOpenDialog}
        onClose={closeDialog}
        disableRestoreFocus
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
          <Button onClick={clearHistory} color="error">
            <FormattedMessage {...messages.clearHistoryConfirmButton} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HistoryMenu;
