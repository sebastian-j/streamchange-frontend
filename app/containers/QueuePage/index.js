import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { StreamTitle } from './components/StreamTitle';
import { StyledButton } from './components/StyledButton';
import { TopBar } from './components/TopBar';
import { TopButtons } from './components/TopButtons';
import WelcomeDialog from '../../components/WelcomeDialog';
import QueueWorker from '../../components/YoutubeWorker/QueueWorker';
import SettingsDialog from '../../components/SettingsDialog';
import SupportInformation from '../../components/SupportInformation';
import { API_KEY, API_URL } from '../../config';

const QueuePage = () => {
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [error, setError] = useState(null);
  const [ban, setBan] = useState(null);

  const leaveStream = () => {
    setVideoId('');
    setTitle('');
    setThumbnailUrl('');
    sessionStorage.removeItem('gv-videoId');
    window.location.reload();
  };

  const telemetry = (vidId, stream) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const telemetryData = {
      videoId: vidId,
      channelId: stream.snippet.channelId,
      part: 'stream',
      title: stream.snippet.title,
      thumbnailUrl: stream.snippet.thumbnails.medium.url,
    };
    axios
      .post(`${API_URL}/v4/telemetry`, qs.stringify(telemetryData), config)
      .then(() => {})
      .catch(() => {});
  };

  const checkBan = (channelId) => {
    axios.get('../static/bans.json').then((res) => {
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

  const launchWorker = (vidId) => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+liveStreamingDetails&id=${vidId}&key=${API_KEY}`,
      )
      .then((res) => {
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
      .catch((err) => {
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

  const receiveVideo = (videoLink) => {
    if (videoLink.includes('v=')) {
      const vidId = videoLink.split('v=')[1].split('&')[0].split('/')[0];
      launchWorker(vidId);
    } else if (videoLink.includes('video/')) {
      const vidId = videoLink.split('video/')[1].split('/')[0];
      launchWorker(vidId);
    } else if (videoLink.includes('u.be/')) {
      const vidId = videoLink.split('be/')[1].split('?')[0];
      launchWorker(vidId);
    } else if (videoLink === 'test') {
      setVideoId(null);
      setThumbnailUrl('https://i.ytimg.com/vi/HwsGz6csNA0/maxresdefault.jpg');
    } else {
      setError('invalidUrl');
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem('gv-videoId');
    if (id !== null) {
      launchWorker(id);
    }
  }, []);

  if (videoId === '') {
    return (
      <>
        <FormattedMessage {...messages.pageTitle}>
          {(pTitle) => (
            <Helmet>
              <title>{pTitle}</title>
            </Helmet>
          )}
        </FormattedMessage>
        <WelcomeDialog
          passVideo={receiveVideo}
          ban={ban}
          error={error}
          variant={1}
        />
      </>
    );
  }
  return (
    <div>
      <FormattedMessage {...messages.pageTitle}>
        {(pTitle) => (
          <Helmet>
            <title>{pTitle}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <TopBar>
        <div>
          <img alt="Thumbnail" src={thumbnailUrl} />
          <StreamTitle>{title}</StreamTitle>
          <StyledButton onClick={leaveStream}>
            <FormattedMessage {...messages.leaveStreamBtn} />
          </StyledButton>
        </div>
        <TopButtons>
          <SupportInformation />
          <SettingsDialog />
        </TopButtons>
      </TopBar>
      <QueueWorker videoId={videoId} />
    </div>
  );
};

export default QueuePage;
