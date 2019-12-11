import React from 'react';
import PropTypes from 'prop-types';
import db from '../YoutubeWorker/db';
import './style.css';
import MessageItem from './MessageItem';

export default class WinnerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: null, title: null, messages: [], interval: null };
    this.getMessages = this.getMessages.bind(this);
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
    this.getMessages();
    this.setState({ interval: setInterval(this.getMessages.bind(this), 3000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    if (!this.state.title) {
      return (
        <div className="gv-column flex-column">
          <h2 className="column-title">Zwycięzca</h2>
          <span>Ładowanie...</span>
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
        <button className="winner-btn" onClick={this.props.onClose}>
          Powrót
        </button>
      </div>
    );
  }
}

WinnerView.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
