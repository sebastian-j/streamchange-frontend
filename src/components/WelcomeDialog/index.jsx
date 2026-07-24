import { useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';
import { CompatibilityInfo } from './components/CompatibilityInfo';
import CookieConsent from './CookieConsent';
import DialogWrapper from './components/DialogWrapper';
import FirstUseScreen from './FirstUseScreen';
import { PhotoBackdrop } from './components/PhotoBackdrop';
import WavyButton from './components/WavyButton';
//import WelcomeHint from './WelcomeHint';

const CHANNEL_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(twitch\.tv|kick\.com)\/([a-zA-Z0-9_-]+)(?:[/?#].*)?$/i;

const parseChannelInput = (value) => {
  const trimmed = value.trim();
  if (trimmed.toLowerCase() === 'test') {
    return { channel: 'test', platform: 'twitch' };
  }
  const match = trimmed.match(CHANNEL_URL_REGEX);
  if (!match) {
    return null;
  }
  const [, domain, channelName] = match;
  return {
    channel: channelName,
    platform: domain.toLowerCase().includes('twitch') ? 'twitch' : 'kick',
  };
};

const WelcomeDialog = (props) => {
  const intl = useIntl();
  const [isChrome] = useState(() => !!window.chrome);
  const [isFirstUse] = useState(() => !localStorage.getItem('locale'));
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);
  const [prevError, setPrevError] = useState(props.error);

  if (props.error !== prevError) {
    setPrevError(props.error);
    if (props.error) setIsLoading(false);
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (isLinkInvalid) {
      setIsLinkInvalid(false);
    }
  };
  const handleConnect = () => {
    const parsed = parseChannelInput(text);
    if (!parsed) {
      setIsLinkInvalid(true);
      return;
    }
    setIsLinkInvalid(false);
    if (typeof props.onStart === 'function') {
      setIsLoading(true);
      props.onStart(parsed.channel, parsed.platform);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleConnect();
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
              <TextField
                autoFocus
                margin="dense"
                name="channel"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                label={intl.formatMessage({ ...messages.videoInputLabel })}
                type="text"
                value={text}
                variant="standard"
                fullWidth
              />
              <div className="text">
                {isLinkInvalid && (
                  <span
                    style={{
                      display: 'block',
                      color: '#bd0013',
                      marginTop: '10px',
                    }}
                  >
                    <FormattedMessage {...messages.invalidChannelUrlError} />
                  </span>
                )}
                {!isLinkInvalid && props.error && (
                  <span
                    style={{
                      display: 'block',
                      color: '#bd0013',
                      marginTop: '10px',
                    }}
                  >
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
                    {props.error && props.error.startsWith('blacklisted:') && (
                      <>
                        <FormattedMessage {...messages.blacklistedError} />
                        <br />
                        {props.error.replace('blacklisted:', '')}
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="actions">
              {!isLoading && (
                <WavyButton
                  onClick={handleConnect}
                  text={intl.formatMessage({ ...messages.saveBtn })}
                />
              )}
              {isLoading && <CircularProgress />}
            </div>
          </div>
          {/*<WelcomeHint />*/}
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
  error: PropTypes.string,
  onStart: PropTypes.func,
  variant: PropTypes.number,
};

export default WelcomeDialog;
