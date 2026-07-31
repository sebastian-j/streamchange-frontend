import { useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';
import { CompatibilityInfo } from './components/CompatibilityInfo';
import CookieConsent from './CookieConsent';
import DialogWrapper from './components/DialogWrapper';
import FirstUseScreen from './FirstUseScreen';
import { PhotoBackdrop } from './components/PhotoBackdrop';
import WavyButton from './components/WavyButton';
import { streamInfoPost } from '../StreamInfo/StreamInfoPost';

const STREAM_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:(twitch\.tv|kick\.com)\/([a-zA-Z0-9_-]+)|(youtube\.com|youtu\.be)\/(?:watch\?v=|shorts\/|live\/|v\/)?([a-zA-Z0-9_.-]+))(?:[/?#].*)?$/i;

const lightMuiTheme = createTheme({ palette: { mode: 'light' } });

const parseChannelInput = (value) => {
  const trimmed = value.trim();

  if (trimmed.toLowerCase() === 'test') {
    return { channel: 'test', platform: 'twitch' };
  }
  if (
    /youtube\.com\/@?[a-zA-Z0-9_.-]+$/i.test(trimmed) &&
    !trimmed.endsWith('/live')
  ) {
    return null;
  }

  const match = trimmed.match(STREAM_URL_REGEX);
  if (!match) {
    return null;
  }

  const [, twKickDomain, twKickChannel, ytDomain, ytVideoId] = match;

  if (twKickDomain) {
    const d = twKickDomain.toLowerCase();
    return {
      channel: twKickChannel,
      platform: d.includes('twitch') ? 'twitch' : 'kick',
    };
  }

  if (ytDomain) {
    const cleanVideoId = ytVideoId.startsWith('@')
      ? ytVideoId.slice(1)
      : ytVideoId;

    return {
      videoId: cleanVideoId,
      platform: 'youtube',
    };
  }

  return null;
};
const WelcomeDialog = (props) => {
  const intl = useIntl();
  const [isChrome] = useState(() => !!window.chrome);
  const [isFirstUse] = useState(() => !localStorage.getItem('locale'));
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);
  const [customError, setCustomError] = useState(null);
  const [prevError, setPrevError] = useState(props.error);

  if (props.error !== prevError) {
    setPrevError(props.error);
    if (props.error) setIsLoading(false);
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (isLinkInvalid) setIsLinkInvalid(false);
    if (customError) setCustomError(null);
  };

  const handleConnect = async () => {
    const parsed = parseChannelInput(text);
    if (!parsed) {
      setIsLinkInvalid(true);
      return;
    }

    setIsLinkInvalid(false);
    setCustomError(null);
    setIsLoading(true);

    try {
      const streamData = await streamInfoPost(parsed.channel, parsed.platform);
      if (typeof props.onStart === 'function') {
        props.onStart(parsed.channel, parsed.platform, streamData);
      }
    } catch (err) {
      setIsLoading(false);
      setCustomError(err.message || 'notStream');
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

  const displayError = customError || props.error;

  if (isChrome || props.variant === 1) {
    return (
      <PhotoBackdrop>
        <MuiThemeProvider theme={lightMuiTheme}>
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
                  {!isLinkInvalid && displayError && (
                    <span
                      style={{
                        display: 'block',
                        color: '#bd0013',
                        marginTop: '10px',
                      }}
                    >
                      {displayError === 'invalidUrl' && (
                        <FormattedMessage {...messages.invalidUrlError} />
                      )}
                      {displayError === 'notStream' && (
                        <FormattedMessage {...messages.notStreamError} />
                      )}
                      {displayError === 'notVideo' && (
                        <FormattedMessage {...messages.notVideoError} />
                      )}
                      {displayError === 'quotaExceeded' && (
                        <FormattedMessage {...messages.quotaExceededError} />
                      )}
                      {displayError &&
                        displayError.startsWith('blacklisted:') && (
                          <>
                            <FormattedMessage {...messages.blacklistedError} />
                            <br />
                            {displayError.replace('blacklisted:', '')}
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
          </DialogWrapper>
        </MuiThemeProvider>
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
