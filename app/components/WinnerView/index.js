import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import db from '../YoutubeWorker/db';
import MessageItem from './MessageItem';
import RelativeDate from '../RelativeDate';
import './style.css';

export default class WinnerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      title: null,
      messages: [],
      interval: null,
      subscriberFrom: null,
      subscriberStatus: null,
    };
    this.getMessages = this.getMessages.bind(this);
    this.checkSubStatus = this.checkSubStatus.bind(this);
  }

  getMessages() {
    const authorId = this.props.id;
    db.table('messages')
      .filter(function(message) {
        return message.authorId === authorId;
      })
      .toArray()
      .then(items => {
        this.setState({ messages: items });
      });
  }

  checkSubStatus() {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${
          this.props.id
        }&forChannelId=${this.props.ownerId}&key=${this.props.apiKey}`,
      )
      .then(res => {
        if (res.data.items.length > 0) {
          this.setState({
            subscriberFrom: res.data.items[0].snippet.publishedAt,
            subscriberStatus: 'true',
          });
        } else {
          this.setState({ subscriberStatus: 'false' });
        }
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.error.errors[0].reason === 'subscriptionForbidden'
        ) {
          this.setState({ subscriberStatus: 'private' });
        } else {
          this.setState({ subscriberStatus: 'error' });
        }
      });
  }

  componentDidMount() {
    const userId = this.props.id;
    db.table('users')
      .filter(function(user) {
        return user.id === userId;
      })
      .toArray()
      .then(items => {
        this.setState({ imageUrl: items[0].imageUrl, title: items[0].title });
      });
    this.checkSubStatus();
    this.getMessages();
    this.setState({ interval: setInterval(this.getMessages.bind(this), 3000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    if (!this.state.title || !this.state.subscriberStatus) {
      return (
        <div className="gv-column flex-column">
          <h2 className="column-title">Zwycięzca</h2>
          <span>Ładowanie...</span>
          <button
            className="winner-btn"
            onClick={this.props.onClose}
            type="button"
          >
            Powrót
          </button>
        </div>
      );
    }
    return (
      <div className="gv-column flex-column">
        <h2 className="column-title">Zwycięzca</h2>
        <div className="winner-outer">
          <img className="winner-logo" alt="logo" src={this.state.imageUrl} />
          <div className="flex-column">
            <span className="winner-title">{this.state.title}</span>
            {this.state.subscriberStatus === 'true' && (
              <span className="winner-sub-status sub-true">
                Subskrybuje od&nbsp;
                <RelativeDate ISO8601Date={this.state.subscriberFrom} />
              </span>
            )}
            {this.state.subscriberStatus === 'false' && (
              <span className="winner-sub-status">Nie subskrybuje</span>
            )}
            {this.state.subscriberStatus === 'private' && (
              <span className="winner-sub-status">Subskrypcje prywatne</span>
            )}
            <a
              href={`https://www.youtube.com/channel/${this.props.id}`}
              target="_blank"
              className="winner-btn"
            >
              Przejdź na kanał
            </a>
          </div>
        </div>
        <ul className="winner-message-list">
          {this.state.messages.map(item => (
            <MessageItem date={item.publishedAt} text={item.displayText} />
          ))}
        </ul>
        <button
          className="winner-btn"
          onClick={this.props.onClose}
          type="button"
        >
          Powrót
        </button>
      </div>
    );
  }
}

WinnerView.propTypes = {
  apiKey: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
