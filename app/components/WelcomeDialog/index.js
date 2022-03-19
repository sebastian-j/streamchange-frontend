import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { CompatibilityInfo } from './components/CompatibilityInfo';
import CookieConsent from './CookieConsent';
import DialogWrapper from './components/DialogWrapper';
import FirstUseScreen from './FirstUseScreen';
import { PhotoBackdrop } from './components/PhotoBackdrop';
import WavyButton from './components/WavyButton';
import WelcomeHint from './WelcomeHint';

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
  if (isChrome || props.variant === 1) {
    return (
      <PhotoBackdrop>
        <DialogWrapper>
          <div className="dialog">
            <div className="title">
              <FormattedMessage {...messages.dialogTitle} />
            </div>
            <div className="content">
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
                    variant="standard"
                    fullWidth
                  />
                )}
              </FormattedMessage>
              <div className="text">
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
              </div>
            </div>
            <div className="actions">
              {!isLoading && (
                <FormattedMessage {...messages.saveBtn} >
                  {(label) => 
                    <WavyButton onClick={sendVideoLink} text={label}/>
                  }
                </FormattedMessage>
              )}
              {isLoading && <CircularProgress />}
            </div>
          </div>
          <WelcomeHint />
        </DialogWrapper>
        <CookieConsent />
      </PhotoBackdrop>
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
  variant: PropTypes.number,
};

export default WelcomeDialog;
