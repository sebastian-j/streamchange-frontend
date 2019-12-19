import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';
import './style.css';

const HomePage = () => {
  const [channelId, setChannelId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [liveChatId, setLiveChatId] = useState('');

  const receiveVideo = videoLink => {
    if (videoLink.includes('v=')) {
      let vidId = videoLink.split('v=')[1];
      vidId = vidId.split('&')[0];
      vidId = vidId.split('/')[0];
      launchWorker(vidId);
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
        setVideoId(vidId);
        setChannelId(res.data.items[0].snippet.channelId);
        setTitle(res.data.items[0].snippet.title);
        setThumbnailUrl(res.data.items[0].snippet.thumbnails.medium.url);
        setLiveChatId(res.data.items[0].liveStreamingDetails.activeLiveChatId);
        sessionStorage.setItem('gv-videoId', vidId);
      });
  };

  useEffect(() => {
    const id = sessionStorage.getItem('gv-videoId');
    if (id !== null) {
      launchWorker(id);
    }
  }, []);

  if (videoId === '') {
    return <WelcomeDialog passVideo={receiveVideo} />;
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
        <NavLink to="/giveaway-history" className="history-navLink">
          Historia wygranych
        </NavLink>
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
