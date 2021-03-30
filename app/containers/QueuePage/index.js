import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import WelcomeDialog from '../../components/WelcomeDialog';
import QueueWorker from '../../components/YoutubeWorker/QueueWorker';
import SettingsDialog from '../../components/SettingsDialog';
import { API_KEY, API_URL } from '../../config';

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

const StyledButton = styled(Button)`
  span {
    color: ${props => props.theme.color};
  }
`;

const QueuePage = () => {
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [error, setError] = useState(null);
  const [ban, setBan] = useState(null);

  const receiveVideo = videoLink => {
    if (videoLink.includes('v=')) {
      const vidId = videoLink
        .split('v=')[1]
        .split('&')[0]
        .split('/')[0];
      launchWorker(vidId);
    } else if (videoLink.includes('video/')) {
      const vidId = videoLink.split('video/')[1].split('/')[0];
      launchWorker(vidId);
    } else if (videoLink.includes('u.be/')) {
      const vidId = videoLink.split('be/')[1].split('?')[0];
      launchWorker(vidId);
    } else {
      setError('invalidUrl');
    }
  };

  const leaveStream = () => {
    setVideoId('');
    setTitle('');
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
          setError('notVideo');
        } else if (res.data.items[0].snippet.liveBroadcastContent === 'none') {
          setError('notStream');
        } else {
          const stream = res.data.items[0];
          setVideoId(vidId);
          setTitle(stream.snippet.title);
          setThumbnailUrl(stream.snippet.thumbnails.medium.url);
          sessionStorage.setItem('gv-videoId', vidId);
          checkBan(stream.snippet.channelId);
          telemetry(vidId, stream);
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          if (err.response.data.error.errors[0].reason.includes('Exceeded')) {
            setError('quotaExceeded');
          }
        } else {
          setVideoId(vidId);
          setTitle('Tytuł nieznany');
          setThumbnailUrl(
            'https://i.ytimg.com/vi/HwsGz6csNA0/maxresdefault.jpg',
          );
          sessionStorage.setItem('gv-videoId', vidId);
        }
      });
  };

  const checkBan = channelId => {
    axios.get('../static/bans.json').then(res => {
      if (res.data) {
        for (let i = 0; i < res.data.items.length; i += 1) {
          if (
            res.data.items[i].channelId.includes(channelId) &&
            new Date(res.data.items[i].endsAt) > new Date()
          ) {
            setVideoId('');
            setBan(res.data.items[i]);
            return;
          }
        }
      }
    });
  };

  const telemetry = (vidId, stream) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const telemetryData = {
      id: vidId,
      channelId: stream.snippet.channelId,
      title: stream.snippet.title,
      thumbnailUrl: stream.snippet.thumbnails.medium.url,
    };
    axios
      .post(`${API_URL}/v4/telemetry`, qs.stringify(telemetryData), config)
      .then(() => {})
      .catch(() => {});
  };

  useEffect(() => {
    const id = sessionStorage.getItem('gv-videoId');
    if (id !== null) {
      launchWorker(id);
    }
  }, []);

  if (videoId === '') {
    return <WelcomeDialog passVideo={receiveVideo} ban={ban} error={error} />;
  }
  return (
    <div>
      <TopBar>
        <StreamInfo>
          <StreamImg alt="Thumbnail" src={thumbnailUrl} />
          <StreamTitle>{title}</StreamTitle>
          <StyledButton onClick={leaveStream}>
            <FormattedMessage {...messages.leaveStreamBtn} />
          </StyledButton>
        </StreamInfo>
        <div style={{ display: 'block' }}>
          <SettingsDialog />
        </div>
      </TopBar>
      <QueueWorker videoId={videoId} />
    </div>
  );
};

export default QueuePage;
