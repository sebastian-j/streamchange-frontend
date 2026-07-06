import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { API_URL } from '../../config';
import { StyledButton } from './components/StyledButton';
import { UrlContainer } from './components/UrlContainer';
import { makeSelectWidgetCode } from './selectors';
import messages from './messages';

export const QueueWidgetDialog = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [widgetUrl, setWidgetUrl] = useState('');
  const urlInput = useRef(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const copyUrl = () => {
    urlInput.current.select();
    document.execCommand('copy');
  };

  useEffect(() => {
    axios.get(`${API_URL}/v4/queueUrl?key=${props.widgetCode}`).then((res) => {
      if (res.data.url) {
        setWidgetUrl(res.data.url);
      }
    });
  }, []);

  return (
    <div style={{ display: 'inline-block' }}>
      <StyledButton onClick={openDialog} type="button">
        <span>
          <FormattedMessage {...messages.widgetDialogTitle} />
        </span>
      </StyledButton>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.widgetDialogTitle} />
        </DialogTitle>
        <DialogContent>
          <FormattedMessage {...messages.widgetDialogFirstLine} />
        </DialogContent>
        <DialogContent>
          <FormattedMessage {...messages.widgetDialogSecondLine} />
        </DialogContent>
        <DialogContent>
          <UrlContainer>
            <input
              onFocus={(event) => event.target.select()}
              readOnly="readonly"
              ref={urlInput}
              type="text"
              value={widgetUrl}
            />
            <div>
              <button onClick={copyUrl} type="button">
                <FormattedMessage {...messages.widgetDialogCopyBtn} />
              </button>
            </div>
          </UrlContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            <FormattedMessage {...messages.cancelBtn} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

QueueWidgetDialog.propTypes = {
  widgetCode: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  widgetCode: makeSelectWidgetCode(),
});

export default connect(mapStateToProps, null)(QueueWidgetDialog);
