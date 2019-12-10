import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ChatEmbed from '../ChatEmbed';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';
import db from './db';
import './style.css';

export default class YoutubeWorker extends React.Component {
  constructor(props) {
    super(props);
    this.messageProcessor = this.messageProcessor.bind(this);
  }

  messageProcessor() {
    let nextPageToken = localStorage.getItem('nextPageToken');
    if (nextPageToken === null) {
      nextPageToken = ' ';
    }
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&maxResults=200&liveChatId=${
          this.props.liveChatId
        }&pageToken=${nextPageToken}&key=${this.props.apiKey}`,
      )
      .then(res => {
        localStorage.setItem('nextPageToken', res.data.nextPageToken);
        for (let i = 0; i < res.data.items.length; i += 1) {
          const author = {
            id: res.data.items[i].authorDetails.channelId,
            imageUrl: res.data.items[i].authorDetails.profileImageUrl,
            title: res.data.items[i].authorDetails.displayName,
            message: res.data.items[i].snippet.displayMessage,
            isModerator: res.data.items[i].authorDetails.isChatModerator,
            isSponsor: res.data.items[i].authorDetails.isChatSponsor,
            isEligible: res.data.items[i].snippet.displayMessage.includes(
              localStorage.getItem('keyword'),
            ),
          };
          const message = {
            authorId: res.data.items[i].authorDetails.channelId,
            displayText: res.data.items[i].snippet.displayMessage,
            publishedAt: res.data.items[i].snippet.publishedAt,
          };
          db.users
            .where('id')
            .equals(author.id)
            .first()
            .then(user => {
              if (user === undefined) {
                db.table('users').add(author);
              } else {
                db.table('users')
                  .where('id')
                  .equals(author.id)
                  .modify({
                    message: author.isEligible ? author.message : user.message,
                    isEligible:
                      user.isEligible === true ? true : author.isEligible,
                  });
              }
            });
          db.table('messages').add(message);
        }
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
