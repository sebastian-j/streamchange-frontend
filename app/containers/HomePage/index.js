/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';
import './style.css';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: '',
      title: '',
      thumbnailUrl: '',
      liveChatId: '',
    };
    this.receiveVideo = this.receiveVideo.bind(this);
    this.leaveStream = this.leaveStream.bind(this);
    this.launchWorker = this.launchWorker.bind(this);
  }

  receiveVideo(videoLink) {
    if (videoLink.includes('v=')) {
      let videoId = videoLink.split('v=')[1];
      videoId = videoId.split('&')[0];
      videoId = videoId.split('/')[0];
      this.launchWorker(videoId);
    }
  }

  leaveStream() {
    this.setState({ videoId: '', title: '', liveChatId: '' });
  }

  launchWorker(videoId) {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+liveStreamingDetails&id=${videoId}&key=API_KEY`,
      )
      .then(res => {
        this.setState({
          videoId,
          title: res.data.items[0].snippet.title,
          thumbnailUrl: res.data.items[0].snippet.thumbnails.maxres.url,
          liveChatId: res.data.items[0].liveStreamingDetails.activeLiveChatId,
        });
      });
  }

  render() {
    if (this.state.videoId === '') {
      return <WelcomeDialog passVideo={this.receiveVideo} />;
    }
    return (
      <div>
        <div className="stream-info">
          <img alt="Miniatura" src={this.state.thumbnailUrl} />
          <span>{this.state.title}</span>
          <Button onClick={this.leaveStream} color="primary">
            Opuść stream
          </Button>
        </div>
        <YoutubeWorker
          liveChatId={this.state.liveChatId}
          videoId={this.state.videoId}
          apiKey="API_KEY"
        />
      </div>
    );
  }
}
