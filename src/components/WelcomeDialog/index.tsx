import { useState } from 'react';
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

const CHANNEL_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(twitch\.tv|kick\.com)\/([a-zA-Z0-9_-]+)(?:[/?#].*)?$/i;

const lightMuiTheme = createTheme({ palette: { mode: 'light' } });

const parseChannelInput = (value: string) => {
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

type WelcomeDialogProps = {
  error?: string;
  onStart?: (channel: string, platform: string, streamData: any) => void;
  variant?: number;
};

const WelcomeDialog = (props: WelcomeDialogProps) => {
  const intl = useIntl();
  const [isChrome] = useState<boolean>(() => !!(window as any).chrome);
  const [isFirstUse] = useState<boolean>(() => !localStorage.getItem('locale'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isLinkInvalid, setIsLinkInvalid] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const [prevError, setPrevError] = useState<string>(props.error);

  if (props.error !== prevError) {
    setPrevError(props.error);
    if (props.error) setIsLoading(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

export default WelcomeDialog;
