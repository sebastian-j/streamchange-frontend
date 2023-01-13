import React, {useEffect, useState} from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import messages from './messages';

interface Props {
  open: boolean;
}

const LotteryLawWarning = ({ open }: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const openDocs = () => {
    window.open('https://www.streamchange.pl/docs/lottery-legal-issues','_blank');
  };

  useEffect(() => {
    setIsOpenDialog(open);
  }, [open]);

  return (
    <Dialog
      open={isOpenDialog}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage {...messages.lawTitle} />
      </DialogTitle>
      <DialogContent>
        <span>
          <FormattedMessage {...messages.lawContent} />
        </span>
      </DialogContent>
      <DialogActions>
        <Button onClick={openDocs} color="primary">
          <FormattedMessage {...messages.lawOpenDocs} />
        </Button>
        <Button onClick={closeDialog} color="primary">
          <FormattedMessage {...messages.lawClose} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LotteryLawWarning;
