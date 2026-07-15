import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';
import { CompatibilityInfo } from './components/CompatibilityInfo';
import CookieConsent from './CookieConsent';
import DialogWrapper from './components/DialogWrapper';
import FirstUseScreen from './FirstUseScreen';
import { PhotoBackdrop } from './components/PhotoBackdrop';
import WavyButton from './components/WavyButton';
import WelcomeHint from './WelcomeHint';

const WelcomeDialog = (props) => {
  const intl = useIntl();
  const [channel, setChannel] = useState('');
  const [platform, setPlatform] = useState('twitch');
  const [isChrome, setIsChrome] = useState(true);
  const [isFirstUse, setIsFirstUse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    const val = e.target.value;
    setText(val);
    const propsArray = val.split('/');
    if (propsArray.length === 2) {
      setChannel(propsArray[1]);
      setPlatform(
        propsArray[0].toLowerCase().includes('twitch') ? 'twitch' : 'kick'
      );
    }
    if (propsArray.length > 2) {
      setChannel(propsArray[3]);
      setPlatform(
        propsArray[2].toLowerCase().includes('twitch') ? 'twitch' : 'kick'
      );
    }
  };
  const handleConnect = () => {
    if (typeof props.onStart === 'function' && channel.trim().length > 0) {
      setIsLoading(true);
      props.onStart(channel.trim(), platform);
    }
  };

  useEffect(() => {
    setIsChrome(!!window.chrome);
    setIsFirstUse(!localStorage.getItem('locale'));
  }, []);

  useEffect(() => {
    if (props.error) setIsLoading(false);
  }, [props.error]);

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
                label="Link do kanału"
                type="text"
                value={text}
                variant="standard"
                fullWidth
              />
              <div className="text">
                {props.error && (
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
                {props.ban && (
                  <span
                    style={{
                      display: 'block',
                      color: '#bd0013',
                      marginTop: '10px',
                    }}
                  >
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
                <WavyButton
                  onClick={handleConnect}
                  text={intl.formatMessage({ ...messages.saveBtn })}
                />
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
  onStart: PropTypes.func,
  variant: PropTypes.number,
};

export default WelcomeDialog;
