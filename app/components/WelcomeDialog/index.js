import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import FirstUseScreen from './FirstUseScreen';
import WelcomeHint from './WelcomeHint';

const WelcomePage = styled.div`
  background: url(../static/streamchange-cover.webp) no-repeat center center
    fixed;
  background-size: cover;
  position: fixed;
  height: 100vh;
  width: 100vw;
`;

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55%;
  left: 30%;
  transform: translate(-50%, -50%);
`;

const SlideDown = keyframes`
  0% {
    transform: translateY(-650px) translateX(-100px);
  }
  20% {
    transform: translateY(-650px) translateX(-100px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
`;

const Dialog = styled.div`
  animation: ${SlideDown} 0.7s ease-out;
  background-color: white;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.52);
  border-radius: 4px;
  max-width: 600px;
  z-index: -1;
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

const WelcomeDialog = (props) => {
  const [videoLink, setVideoLink] = useState('');
  const [isChrome, setIsChrome] = useState(true);
  const [isFirstUse, setIsFirstUse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendVideoLink = () => {
    if (typeof props.passVideo === 'function') {
      setIsLoading(true);
      props.passVideo(videoLink);
    }
  };

  useEffect(() => {
    setIsChrome(!!window.chrome);
    setIsFirstUse(!localStorage.getItem('locale'));
  }, []);

  useEffect(() => {
    if (props.error) setIsLoading(false);
  }, [props.error]);

  const handleInputValueChange = (event) => {
    const { target } = event;
    const { value } = target;
    setVideoLink(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendVideoLink();
    }
  };

  if (isFirstUse) {
    return <FirstUseScreen />;
  }
  if (isChrome) {
    return (
      <WelcomePage>
        <DialogWrapper>
          <Dialog>
            <DialogTitle>
              <FormattedMessage {...messages.dialogTitle} />
            </DialogTitle>
            <DialogContent>
              <FormattedMessage {...messages.videoInputLabel}>
                {(label) => (
                  <TextField
                    autoFocus
                    margin="dense"
                    name="videoLink"
                    onChange={handleInputValueChange}
                    onKeyPress={handleKeyPress}
                    id="videoLink"
                    label={label}
                    type="text"
                    value={videoLink}
                    fullWidth
                  />
                )}
              </FormattedMessage>
              <TextSecondary>
                <span style={{ fontSize: '0.8rem' }}>
                  <FormattedMessage {...messages.example} />
                </span>
                {props.error && (
                  <span style={{ display: 'block', color: '#bd0013' }}>
                    {props.error === 'invalidUrl' && (
                      <FormattedMessage {...messages.invalidUrlError} />
                    )}
                    {props.error === 'notStream' && (
                      <FormattedMessage {...messages.notStreamError} />
                    )}
                    {props.error === 'notVideo' && (
                      <FormattedMessage {...messages.notVideoError} />
                    )}
                    {props.error === 'quotaExceeded' && (
                      <FormattedMessage {...messages.quotaExceededError} />
                    )}
                  </span>
                )}
                {props.ban && (
                  <span style={{ display: 'block', color: '#bd0013' }}>
                    <FormattedMessage {...messages.banDate} />
                    {` ${props.ban.endsAt} `}
                    <FormattedMessage {...messages.banReason} />
                    {props.ban.description}
                  </span>
                )}
              </TextSecondary>
            </DialogContent>
            <DialogActions>
              {!isLoading && (
                <Button onClick={sendVideoLink} color="primary">
                  <FormattedMessage {...messages.saveBtn} />
                </Button>
              )}
              {isLoading && <CircularProgress />}
            </DialogActions>
          </Dialog>
          <WelcomeHint />
        </DialogWrapper>
      </WelcomePage>
    );
  }
  return (
    <CompatibilityInfo>
      <div>
        <FormattedMessage {...messages.compatibilityInfo} />
      </div>
    </CompatibilityInfo>
  );
};

WelcomeDialog.propTypes = {
  ban: PropTypes.object,
  error: PropTypes.string,
  passVideo: PropTypes.func,
};

export default WelcomeDialog;
