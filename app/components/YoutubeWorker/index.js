import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ChatEmbed from '../ChatEmbed';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';
import './style.css';

export default class YoutubeWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.messageProcessor = this.messageProcessor.bind(this);
  }

  messageProcessor() {
    var nextPageToken = localStorage.getItem('nextPageToken');
    if (nextPageToken === null) {
      nextPageToken = ' ';
    }
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&maxResults=200&liveChatId=${this.props.liveChatId}&pageToken=${nextPageToken}&key=${
          this.props.apiKey
          }`,
      )
      .then(res => {
        localStorage.setItem('nextPageToken', res.data.nextPageToken);
        setTimeout(this.messageProcessor, res.data.pollingIntervalMillis);
      });
  }

  componentDidMount() {
    this.messageProcessor();
  }

  render() {
    return (
      <div className="three-sections">
        <UserList />
        <GiveawayRules />
        <ChatEmbed videoId={this.props.videoId} />
      </div>
    );
  }
}

YoutubeWorker.propTypes = {
  apiKey: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  liveChatId: PropTypes.string.isRequired,
};
