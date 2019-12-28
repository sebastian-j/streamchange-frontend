import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';
import SettingsDialog from '../../components/SettingsDialog';
import './style.css';

const HomePage = () => {
  const [channelId, setChannelId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [liveChatId, setLiveChatId] = useState('');
  const [error, setError] = useState(null);

  const receiveVideo = videoLink => {
    if (videoLink.includes('v=')) {
      let vidId = videoLink.split('v=')[1];
      vidId = vidId.split('&')[0];
      vidId = vidId.split('/')[0];
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
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+liveStreamingDetails&id=${vidId}&key=API_KEY`,
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
      <div className="flex-row-space">
        <div className="stream-info">
          <img alt="Miniatura" src={thumbnailUrl} />
          <span>{title}</span>
          <Button onClick={leaveStream} color="primary">
            Opuść stream
          </Button>
        </div>
        <div style={{ display: 'block' }}>
          <NavLink to="/giveaway-history" className="history-navLink">
            Historia wygranych
          </NavLink>
          <SettingsDialog />
        </div>
      </div>
      <YoutubeWorker
        channelId={channelId}
        liveChatId={liveChatId}
        videoId={videoId}
        apiKey="API_KEY"
      />
    </div>
  );
};

export default HomePage;
