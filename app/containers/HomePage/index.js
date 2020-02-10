import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';
import SettingsDialog from '../../components/SettingsDialog';
import { API_KEY, TELEMETRY_URL } from '../../config';

const TopBar = styled.div`
  background-color: ${props => props.theme.panelBackground};
  display: flex;
  justify-content: space-between;
`;

const StreamInfo = styled.div`
  height: 5vh;
`;

const StreamImg = styled.img`
  height: 100%;
`;

const StreamTitle = styled.span`
  color: ${props => props.theme.staticTextColor};
  margin-left: 10px;
`;

const LinkToHistory = styled.span`
  background: ${props => props.theme.buttonBackground};
  border: 1px solid #0059a3;
  color: ${props => props.theme.buttonTextColor};
  border-radius: 4px;
  height: 80%;
  padding: 3px 5px;
  margin: 10px 15px 0 0;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.buttonBackgroundHover};
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const StyledButton = styled(Button)`
  span {
    color: ${props => props.theme.materialButtonColor};
  }
`;

const HomePage = () => {
  const [channelId, setChannelId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [liveChatId, setLiveChatId] = useState('');
  const [error, setError] = useState(null);

  const receiveVideo = videoLink => {
    if (videoLink.includes('v=')) {
      const vidId = videoLink
        .split('v=')[1]
        .split('&')[0]
        .split('/')[0];
      launchWorker(vidId);
    } else {
      setError('To nie jest link do live streama ani filmu na Youtube.');
    }
  };

  const leaveStream = () => {
    setVideoId('');
    setTitle('');
    setLiveChatId('');
    setThumbnailUrl('');
    sessionStorage.removeItem('gv-videoId');
    window.location.reload();
  };

  const launchWorker = vidId => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+liveStreamingDetails&id=${vidId}&key=${API_KEY}`,
      )
      .then(res => {
        if (res.data.items.length === 0) {
          setError('Nie ma takiego streama. Link jest błędny.');
        } else if (res.data.items[0].snippet.liveBroadcastContent === 'none') {
          setError('To jest link do zwykłego filmu. Wklej link do streama');
        } else {
          const stream = res.data.items[0];
          setVideoId(vidId);
          setChannelId(stream.snippet.channelId);
          setTitle(stream.snippet.title);
          setThumbnailUrl(stream.snippet.thumbnails.medium.url);
          setLiveChatId(stream.liveStreamingDetails.activeLiveChatId);
          sessionStorage.setItem('gv-videoId', vidId);
          axios.get(
            `${TELEMETRY_URL}?id=${vidId}&channelId=${
              stream.snippet.channelId
            }&title=${stream.snippet.title}`,
          );
        }
      })
      .catch(err => {
        if (err.response.data && err.response.data.error) {
          if (err.response.data.error.errors[0].reason.includes('Exceeded')) {
            setError('Limit quota został wyczerpany.');
          }
        }
      });
  };

  useEffect(() => {
    const id = sessionStorage.getItem('gv-videoId');
    if (id !== null) {
      launchWorker(id);
    }
  }, []);

  if (videoId === '') {
    return <WelcomeDialog passVideo={receiveVideo} error={error} />;
  }
  return (
    <div>
      <TopBar>
        <StreamInfo>
          <StreamImg alt="Miniatura" src={thumbnailUrl} />
          <StreamTitle>{title}</StreamTitle>
          <StyledButton onClick={leaveStream}>
            <FormattedMessage {...messages.leaveStreamBtn} />
          </StyledButton>
        </StreamInfo>
        <div style={{ display: 'block' }}>
          <NavLink to="/giveaway-history" style={{ textDecoration: 'none' }}>
            <LinkToHistory>
              <FormattedMessage {...messages.historyLink} />
            </LinkToHistory>
          </NavLink>
          <SettingsDialog />
        </div>
      </TopBar>
      <YoutubeWorker
        channelId={channelId}
        liveChatId={liveChatId}
        videoId={videoId}
        apiKey={API_KEY}
      />
    </div>
  );
};

export default HomePage;
