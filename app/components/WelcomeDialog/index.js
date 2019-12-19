import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import './style.css';

const WelcomeDialog = props => {
  const [isOpen, setIsOpen] = useState(true);
  const [videoLink, setVideoLink] = useState('');
  const [isChrome, setIsChrome] = useState('');

  const sendVideoLink = () => {
    if (typeof props.passVideo === 'function') {
      props.passVideo(videoLink);
    }
  };

  useEffect(() => {
    setIsChrome(!!window.chrome);
  }, []);

  const handleInputValueChange = event => {
    const { target } = event;
    const { value } = target;
    setVideoLink(value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendVideoLink();
    }
  };

  if (isChrome) {
    return (
      <div className="blur">
        <Dialog open={isOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Wybierz, na którym streamie organizujesz giveaway
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="videoLink"
              onChange={handleInputValueChange}
              onKeyPress={handleKeyPress}
              id="videoLink"
              label="Wklej link do streama"
              type="text"
              value={videoLink}
              fullWidth
            />
            <DialogContentText>
              <span style={{ fontSize: '0.8rem' }}>
                Przykład: https://www.youtube.com/watch?v=CBUBY45me_A
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={sendVideoLink} color="primary">
              Dalej
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return (
    <div className="vertical">
      <div className="compatibility-info">
        Aplikacja działa wyłącznie w Google Chrome
      </div>
    </div>
  );
};

WelcomeDialog.propTypes = {
  passVideo: PropTypes.func,
};

export default WelcomeDialog;
