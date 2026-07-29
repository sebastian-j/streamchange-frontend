import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormattedMessage, useIntl } from 'react-intl';

import messages from './messages';
import supportMessages from '../../components/SupportInformation/messages';
import settingsMessages from '../../components/SettingsDialog/messages';
import { changeDialogVisibility } from '../../components/SupportInformation/actions';
import HistoryWidget from './HistoryWidget';
import { purgeUsersTable } from '../../components/UserList/model';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';
import SettingsDialog from '../../components/SettingsDialog';
import SupportInformation from '../../components/SupportInformation';
import {
  AvatarFallback,
  AvatarSkeleton,
} from '../../components/AvatarFallback';
import { API_KEY, BACKEND_URL } from '../../config';
import { changeColor } from '../../containers/StyleProvider/actions';

const PLATFORM_COLORS = {
  twitch: '#9370DB',
  kick: '#53FC18',
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  @media (orientation: portrait) {
    height: auto;
    overflow-y: auto;
  }
`;

const TopBar = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  @media (orientation: portrait) {
    align-items: center;
    gap: 4px;
    padding: 2px 4px;
  }
`;

const StreamInfoBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  @media (orientation: portrait) {
    flex: 1 1 auto;
    height: 40px;
    min-width: 0;
    overflow: hidden;
  }
`;

const StreamAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid
    ${(props) => (props.$platform === 'twitch' ? '#9370DB' : '#7CFC00')};
`;

const ChannelName = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  @media (orientation: portrait) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TopButtons = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.color};
  }
`;

/*
 * On mobile the toolbar actions live in the hamburger menu. The dialogs stay
 * mounted (their triggers are hidden) because MUI renders them in a portal, so
 * the menu can open them through props/Redux.
 */
const HiddenTriggers = styled.div`
  display: none;
`;

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const GiveawayPage = (props) => {
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(() =>
    sessionStorage.getItem('gv-avatarUrl')
  );
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isMobile = useMediaQuery('(orientation: portrait)');
  const dispatch = useDispatch();
  const intl = useIntl();

  const closeMenu = () => setMenuAnchor(null);

  const leaveStream = async () => {
    props.clearUserList();
    await purgeUsersTable();

    const streamProps = {
      ownerId: '',
      thumbnailUrl: '',
      title: '',
      videoId: '',
      platform: '',
    };
    props.changeStreamProperties(streamProps);
    sessionStorage.removeItem('gv-videoId');
    sessionStorage.removeItem('gv-title');
    sessionStorage.removeItem('gv-thumbnailUrl');
    sessionStorage.removeItem('gv-ownerId');
    sessionStorage.removeItem('gv-avatarUrl');
    localStorage.removeItem('gv-channel');
    localStorage.removeItem('gv-platform');
    window.location.reload();
  };

  const handleStartStream = async (channelName, platformName, streamData) => {
    setError(null);
    try {
      const blacklistRes = await axios.get(
        `${BACKEND_URL}/api/check-blacklist`,
        { params: { channel: channelName, platform: platformName } }
      );
      if (blacklistRes.data.blacklisted) {
        setError(`blacklisted:${blacklistRes.data.reason}`);
        return;
      }
    } catch (err) {
      console.warn('Nie udało się sprawdzić blacklisty:', err);
    }

    localStorage.setItem('gv-channel', channelName);
    localStorage.setItem('gv-platform', platformName);

    if (!localStorage.getItem('themeColor') && PLATFORM_COLORS[platformName]) {
      dispatch(changeColor(PLATFORM_COLORS[platformName]));
    }

    if (platformName === 'youtube') {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+liveStreamingDetails&id=${channelName}&key=${API_KEY}`
        )
        .then((res) => {
          if (res.data.items.length === 0) {
            setError('notVideo');
          } else if (
            res.data.items[0].snippet.liveBroadcastContent === 'none'
          ) {
            setError('notStream');
          } else {
            const stream = res.data.items[0];
            const streamProps = {
              ownerId: stream.snippet.channelId,
              thumbnailUrl: stream.snippet.thumbnails.medium.url,
              title: stream.snippet.title,
              videoId: channelName,
              platform: platformName,
              streamData,
            };
            props.changeStreamProperties(streamProps);
            sessionStorage.setItem('gv-videoId', channelName);
            sessionStorage.setItem('gv-title', streamProps.title);
            sessionStorage.setItem('gv-thumbnailUrl', streamProps.thumbnailUrl);
            sessionStorage.setItem('gv-ownerId', streamProps.ownerId);
            sessionStorage.setItem('gv-streamData', JSON.stringify(streamData));
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            if (err.response.data.error.errors[0].reason.includes('Exceeded')) {
              setError('quotaExceeded');
            }
          } else {
            const streamProps = {
              ownerId: channelName,
              thumbnailUrl:
                'https://i.ytimg.com/vi/HwsGz6csNA0/maxresdefault.jpg',
              title: 'Tytuł nieznany',
              videoId: channelName,
              platform: platformName,
              streamData,
            };
            props.changeStreamProperties(streamProps);
            sessionStorage.setItem('gv-videoId', channelName);
          }
        });
    } else {
      const streamProps = {
        ownerId: channelName,
        thumbnailUrl:
          streamData?.thumbnail_url ||
          'https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg',
        title: streamData?.title || channelName,
        videoId: channelName,
        platform: platformName,
        streamData: streamData,
      };
      props.changeStreamProperties(streamProps);
      if (streamData) {
        sessionStorage.setItem('gv-streamData', JSON.stringify(streamData));
      }

      if (streamData?.user_id) {
        fetchAvatar(streamData.user_id, platformName);
      }
    }
  };

  const fetchAvatar = async (userId, platform) => {
    setAvatarLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/avatar`, {
        params: { user_id: userId, platform },
      });
      if (res.data?.url) {
        setAvatarUrl(res.data.url);
        sessionStorage.setItem('gv-avatarUrl', res.data.url);
      }
    } catch (err) {
      console.warn('Nie udało się pobrać avatara:', err);
    } finally {
      setAvatarLoading(false);
    }
  };

  const { changeStreamProperties } = props;
  useEffect(() => {
    const channel =
      localStorage.getItem('gv-channel') ||
      sessionStorage.getItem('gv-videoId');
    const platform = localStorage.getItem('gv-platform') || 'youtube';
    const storedTitle = sessionStorage.getItem('gv-title') || channel;
    const storedThumbnail =
      sessionStorage.getItem('gv-thumbnailUrl') ||
      'https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg';
    const storedOwnerId = sessionStorage.getItem('gv-ownerId') || channel;
    const savedStreamData = sessionStorage.getItem('gv-streamData');
    const parsedStreamData = savedStreamData
      ? JSON.parse(savedStreamData)
      : null;
    const storedAvatar = sessionStorage.getItem('gv-avatarUrl');

    if (channel) {
      const streamProps = {
        ownerId: storedOwnerId,
        thumbnailUrl: storedThumbnail,
        title: storedTitle,
        videoId: channel,
        platform,
        streamData: parsedStreamData,
      };
      changeStreamProperties(streamProps);

      if (!storedAvatar && parsedStreamData?.user_id) {
        fetchAvatar(parsedStreamData.user_id, platform);
      }
    }
  }, [changeStreamProperties]);

  if (props.streamInfo.videoId === '') {
    return (
      <>
        <Helmet htmlAttributes={{ lang: intl.locale }}>
          <title>{intl.formatMessage({ ...messages.pageTitle })}</title>
        </Helmet>
        <WelcomeDialog onStart={handleStartStream} error={error} variant={0} />
      </>
    );
  }
  return (
    <PageContainer>
      <Helmet htmlAttributes={{ lang: intl.locale }}>
        <title>{intl.formatMessage({ ...messages.pageTitle })}</title>
      </Helmet>
      <TopBar>
        <StreamInfoBar>
          {avatarUrl ? (
            <StreamAvatar
              alt="Profile"
              src={avatarUrl}
              $platform={props.streamInfo.platform}
            />
          ) : avatarLoading ? (
            <AvatarSkeleton $size="small" />
          ) : (
            <AvatarFallback $size="small">
              {(
                props.streamInfo?.streamData?.channel_name ||
                props.streamInfo.videoId ||
                '?'
              )
                .charAt(0)
                .toUpperCase()}
            </AvatarFallback>
          )}
          <ChannelName>
            {props.streamInfo?.streamData?.channel_name ||
              props.streamInfo.videoId}
          </ChannelName>
          {!isMobile && (
            <StyledButton onClick={leaveStream}>
              <span>
                <FormattedMessage {...messages.leaveStreamBtn} />
              </span>
            </StyledButton>
          )}
        </StreamInfoBar>
        <TopButtons>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                onClick={(event) => setMenuAnchor(event.currentTarget)}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
              >
                <MenuItem
                  component={NavLink}
                  to="/giveaway-history"
                  onClick={closeMenu}
                >
                  <FormattedMessage {...messages.historyLink} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenu();
                    dispatch(changeDialogVisibility(true));
                  }}
                >
                  <FormattedMessage {...supportMessages.toolbarButtonTooltip} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenu();
                    setIsSettingsOpen(true);
                  }}
                >
                  <FormattedMessage {...settingsMessages.dialogTitle} />
                </MenuItem>
                <MenuItem onClick={leaveStream}>
                  <FormattedMessage {...messages.leaveStreamBtn} />
                </MenuItem>
              </Menu>
              <HiddenTriggers>
                <SupportInformation />
                <SettingsDialog
                  open={isSettingsOpen}
                  onClose={() => setIsSettingsOpen(false)}
                />
              </HiddenTriggers>
            </>
          ) : (
            <>
              <HistoryWidget />
              <SupportInformation />
              <SettingsDialog />
            </>
          )}
        </TopButtons>
      </TopBar>
      <YoutubeWorker
        channel={props.streamInfo.videoId}
        platform={props.streamInfo.platform}
        apiKey={API_KEY}
        onBlacklisted={(reason) => {
          setError(`blacklisted:${reason}`);
          const streamProps = {
            ownerId: '',
            thumbnailUrl: '',
            title: '',
            videoId: '',
            platform: '',
          };
          props.changeStreamProperties(streamProps);
          sessionStorage.removeItem('gv-videoId');
          sessionStorage.removeItem('gv-title');
          sessionStorage.removeItem('gv-thumbnailUrl');
          sessionStorage.removeItem('gv-ownerId');
          localStorage.removeItem('gv-channel');
          localStorage.removeItem('gv-platform');
        }}
      />
    </PageContainer>
  );
};

GiveawayPage.propTypes = {
  changeStreamProperties: PropTypes.func.isRequired,
  streamInfo: PropTypes.object.isRequired,
};

export default GiveawayPage;
