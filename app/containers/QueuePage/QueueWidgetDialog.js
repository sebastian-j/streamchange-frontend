import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { API_URL } from '../../config';
import { makeSelectWidgetCode } from './selectors';
import messages from './messages';

const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.color};
  }
`;

const UrlContainer = styled.div`
  display: flex;
  background-color: hsl(300, 2%, 12%);
  border-radius: 4px;
  input {
    color: #e1e0e1;
    flex: 1;
    border: none;
    background-color: #00000000;
    overflow: hidden;
    padding: 8px 6px;
  }
  div {
    flex: 0.2;
  }
  div button {
    background-color: transparent;
    border: none;
    color: rgb(27, 142, 230);
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    padding: 10px 14px;
    text-transform: uppercase;
  }
`;

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
        <FormattedMessage {...messages.widgetDialogTitle} />
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
