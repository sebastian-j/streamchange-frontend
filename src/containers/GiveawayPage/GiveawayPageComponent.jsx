import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Button from '@mui/material/Button';
import { FormattedMessage, useIntl } from 'react-intl';

import messages from './messages';
import HistoryWidget from './HistoryWidget';
import { purgeUsersTable } from '../../components/UserList/model';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';
import SettingsDialog from '../../components/SettingsDialog';
import SupportInformation from '../../components/SupportInformation';
import { API_KEY, BACKEND_URL } from '../../config';

const TopBar = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  justify-content: space-between;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

const StreamInfo = styled.div`
  height: 5vh;
`;

const StreamImg = styled.img`
  height: 100%;
`;

const StreamTitle = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  margin-left: 10px;
`;

const TopButtons = styled.div`
  align-items: center;
  display: flex;
  @media (orientation: portrait) {
    display: flex;
    justify-content: space-between;
    margin: 30px 10px 4px 10px;
  }
`;

const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.color};
  }
`;

const GiveawayPage = (props) => {
  const [error, setError] = useState(null);
  const intl = useIntl();

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
    localStorage.removeItem('gv-channel');
    localStorage.removeItem('gv-platform');
    window.location.reload();
  };

  const handleStartStream = async (channelName, platformName) => {
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
            };
            props.changeStreamProperties(streamProps);
            sessionStorage.setItem('gv-videoId', channelName);
            sessionStorage.setItem('gv-title', streamProps.title);
            sessionStorage.setItem('gv-thumbnailUrl', streamProps.thumbnailUrl);
            sessionStorage.setItem('gv-ownerId', streamProps.ownerId);
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
            };
            props.changeStreamProperties(streamProps);
            sessionStorage.setItem('gv-videoId', channelName);
          }
        });
    } else {
      const streamProps = {
        ownerId: channelName,
        thumbnailUrl:
          'https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg',
        title: channelName,
        videoId: channelName,
        platform: platformName,
      };
      props.changeStreamProperties(streamProps);
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

    if (channel) {
      const streamProps = {
        ownerId: storedOwnerId,
        thumbnailUrl: storedThumbnail,
        title: storedTitle,
        videoId: channel,
        platform: platform,
      };
      changeStreamProperties(streamProps);
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
    <>
      <Helmet htmlAttributes={{ lang: intl.locale }}>
        <title>{intl.formatMessage({ ...messages.pageTitle })}</title>
      </Helmet>
      <TopBar>
        <StreamInfo>
          <StreamImg alt="Thumbnail" src={props.streamInfo.thumbnailUrl} />
          <StreamTitle>{props.streamInfo.title}</StreamTitle>
          <StyledButton onClick={leaveStream}>
            <span>
              <FormattedMessage {...messages.leaveStreamBtn} />
            </span>
          </StyledButton>
        </StreamInfo>
        <TopButtons>
          <HistoryWidget />
          <SupportInformation />
          <SettingsDialog />
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
    </>
  );
};

GiveawayPage.propTypes = {
  changeStreamProperties: PropTypes.func.isRequired,
  streamInfo: PropTypes.object.isRequired,
};

export default GiveawayPage;
