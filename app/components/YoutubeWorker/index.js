import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './style.css';
import ChatEmbed from '../ChatEmbed';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';

export default class YoutubeWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
  videoId: PropTypes.string,
};
