import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { HINTS } from '../../config';
import './style.css';

const WelcomeDialog = props => {
  const [videoLink, setVideoLink] = useState('');
  const [isChrome, setIsChrome] = useState(true);
  const [hint, setHint] = useState('');

  const sendVideoLink = () => {
    if (typeof props.passVideo === 'function') {
      props.passVideo(videoLink);
    }
  };

  useEffect(() => {
    setIsChrome(!!window.chrome);
    setHint(HINTS[Math.floor(Math.random() * HINTS.length)]);
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
        <div className="welcome-wrapper">
          <div className="welcomeDialog">
            <div className="welcomeDialog-title">
              Wybierz, na którym streamie organizujesz giveaway
            </div>
            <div className="welcomeDialog-content">
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
              <div className="welcomeDialog-textSecondary">
                <span style={{ fontSize: '0.8rem' }}>
                  Przykład: https://www.youtube.com/watch?v=CBUBY45me_A
                </span>
                {props.error && (
                  <span style={{ display: 'block', color: '#bd0013' }}>
                    {props.error}
                  </span>
                )}
              </div>
            </div>
            <div className="welcomeDialog-actions">
              <Button onClick={sendVideoLink} color="primary">
                Dalej
              </Button>
            </div>
          </div>
          <div className="welcomeHint">
            <img
              src="/static/light-bulb.png"
              height="140px"
              alt="light bulb"
            />
            <div>
              <span className="welcomeHint-title">Czy wiesz, że...</span>
              <span className="welcomeHint-content">{hint}</span>
            </div>
          </div>
        </div>
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
  error: PropTypes.string,
  passVideo: PropTypes.func,
};

export default WelcomeDialog;
