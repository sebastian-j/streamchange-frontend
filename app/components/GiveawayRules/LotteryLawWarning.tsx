import React, {useEffect, useState} from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
