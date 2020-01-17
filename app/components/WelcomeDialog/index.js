import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { HINTS } from '../../config';
import './style.css';

const WelcomePage = styled.div`
  background-color: ${props => props.theme.welcomeBackground};
  position: fixed;
  height: 100vh;
  width: 100vw;
`;

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Dialog = styled.div`
  background-color: white;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  max-width: 600px;
`;

const DialogTitle = styled.div`
  font-size: 1.25rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  padding: 16px 24px;
`;

const DialogContent = styled.div`
  padding: 8px 24px;
`;

const DialogActions = styled.div`
  flex: 0 0 auto;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;
`;

const TextSecondary = styled.div`
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.5;
  margin-bottom: 12px;
`;
const CompatibilityInfo = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  div {
    font-size: 3vw;
    text-align: center;
  }
`;

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
      <WelcomePage>
        <DialogWrapper>
          <Dialog>
            <DialogTitle>
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
              <TextSecondary>
                <span style={{ fontSize: '0.8rem' }}>
                  Przykład: https://www.youtube.com/watch?v=CBUBY45me_A
                </span>
                {props.error && (
                  <span style={{ display: 'block', color: '#bd0013' }}>
                    {props.error}
                  </span>
                )}
              </TextSecondary>
            </DialogContent>
            <DialogActions>
              <Button onClick={sendVideoLink} color="primary">
                Dalej
              </Button>
            </DialogActions>
          </Dialog>
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
        </DialogWrapper>
      </WelcomePage>
    );
  }
  return (
    <CompatibilityInfo>
      <div>Aplikacja działa wyłącznie w Google Chrome</div>
    </CompatibilityInfo>
  );
};

WelcomeDialog.propTypes = {
  error: PropTypes.string,
  passVideo: PropTypes.func,
};

export default WelcomeDialog;
