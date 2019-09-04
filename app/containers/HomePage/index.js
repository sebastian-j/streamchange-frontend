/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: '',
    };
    this.receiveVideo = this.receiveVideo.bind(this);
  }

  receiveVideo(videoLink) {
    if (videoLink.includes('v=')) {
      let videoId = videoLink.split('v=')[1];
      videoId = videoId.split('&')[0];
      videoId = videoId.split('/')[0];
      this.setState({
        videoId,
      });
    }
  }

  render() {
    if (this.state.videoId === '') {
      return <WelcomeDialog passVideo={this.receiveVideo} />;
    }
    return (
      <div>
        <YoutubeWorker videoId={this.state.videoId} />
      </div>
    );
  }
}
