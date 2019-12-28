import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import db from '../YoutubeWorker/db';
import MessageItem from './MessageItem';
import RelativeDate from '../RelativeDate';
import './style.css';

export default class WinnerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      messages: [],
      interval: null,
      prize: this.props.prize,
      subscriberFrom: null,
      subscriberStatus: null,
    };
    this.getMessages = this.getMessages.bind(this);
    this.checkSubStatus = this.checkSubStatus.bind(this);
    this.saveAndExit = this.saveAndExit.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  getMessages() {
    db.table('messages')
      .filter(message => message.authorId === this.props.id)
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

  saveAndExit() {
    const d = new Date();
    const winner = {
      channelId: this.state.user.id,
      displayName: this.state.user.title,
      imageUrl: this.state.user.imageUrl,
      message: this.state.user.message,
      prize: this.state.prize,
      createdAt: d.toISOString(),
    };
    if (localStorage.getItem('gv-deleteWinner') === 'true') {
      db.table('users')
        .where('id')
        .equals(winner.channelId)
        .modify({
          isEligible: false,
        });
    }
    db.table('history')
      .add(winner)
      .finally(() => {
        this.props.onClose();
      });
  }

  handleInputValueChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    const userId = this.props.id;
    db.table('users')
      .filter(user => user.id === userId)
      .toArray()
      .then(items => {
        this.setState({ user: items[0] });
      });
    this.checkSubStatus();
    this.getMessages();
    this.setState({ interval: setInterval(this.getMessages.bind(this), 3000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    if (!this.state.user || !this.state.subscriberStatus) {
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
          <img
            className="winner-logo"
            alt="logo"
            src={this.state.user.imageUrl}
          />
          <div className="flex-column">
            <span className="winner-title">{this.state.user.title}</span>
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
        <TextField
          autoFocus
          margin="dense"
          name="prize"
          onChange={this.handleInputValueChange}
          label="Nagroda"
          type="text"
          value={this.state.prize}
          fullWidth
        />
        <button className="winner-btn" onClick={this.saveAndExit} type="button">
          Zapisz i wróć
        </button>
      </div>
    );
  }
}

WinnerView.propTypes = {
  apiKey: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  prize: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
