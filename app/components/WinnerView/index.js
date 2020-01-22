import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import db from '../YoutubeWorker/db';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import MessageItem from './MessageItem';
import RelativeDate from '../RelativeDate';
import Timer from './Timer';

const WinnerPanel = styled.div`
  background-color: ${props => props.theme.panelBackground};
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  margin: 15px;
  padding: 15px;
`;

const WinnerHeading = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const Logo = styled.img`
  height: 70px;
  width: 70px;
  margin-right: 10px;
`;

const WinnerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const WinnerTitle = styled.span`
  color: ${props => props.theme.staticTextColor};
  font-size: 20px;
`;

const SubStatus = styled.span`
  color: ${props => props.theme.staticTextColor};
  font-size: 0.9rem;
  padding-bottom: 3px;
  ${({ subscribed }) =>
    subscribed &&
    `
      font-weight: bold;
      color: #007703;
  `}
`;
const ChannelLink = styled.a`
  background: ${props => props.theme.buttonBackground};
  border: 1px solid #0059a3;
  color: ${props => props.theme.buttonTextColor};
  border-radius: 4px;
  padding: 3px 5px;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.buttonBackgroundHover};
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const Button = styled.button`
  background: ${props => props.theme.buttonBackground};
  border: 1px solid #0059a3;
  color: ${props => props.theme.buttonTextColor};
  border-radius: 4px;
  padding: 3px 5px;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.buttonBackgroundHover};
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const MessageList = styled.ul`
  overflow-y: auto;
  list-style: none;
  padding: 0;
`;

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
        <WinnerPanel>
          <PanelTitle>Zwycięzca</PanelTitle>
          <span>Ładowanie...</span>
          <Button onClick={this.props.onClose} type="button">
            Powrót
          </Button>
        </WinnerPanel>
      );
    }
    return (
      <WinnerPanel>
        <PanelTitle>Zwycięzca</PanelTitle>
        <WinnerHeading>
          <Logo alt="logo" src={this.state.user.imageUrl} />
          <WinnerInfo>
            <WinnerTitle>{this.state.user.title}</WinnerTitle>
            {this.state.subscriberStatus === 'true' && (
              <SubStatus subscribed>
                Subskrybuje od&nbsp;
                <RelativeDate ISO8601Date={this.state.subscriberFrom} />
              </SubStatus>
            )}
            {this.state.subscriberStatus === 'false' && (
              <SubStatus>Nie subskrybuje</SubStatus>
            )}
            {this.state.subscriberStatus === 'private' && (
              <SubStatus>Subskrypcje prywatne</SubStatus>
            )}
            <ChannelLink
              href={`https://www.youtube.com/channel/${this.props.id}`}
              target="_blank"
            >
              Przejdź na kanał
            </ChannelLink>
          </WinnerInfo>
          <Timer />
        </WinnerHeading>
        <MessageList>
          {this.state.messages.map(item => (
            <MessageItem date={item.publishedAt} text={item.displayText} />
          ))}
        </MessageList>
        <StyledTextField
          autoFocus
          margin="dense"
          name="prize"
          onChange={this.handleInputValueChange}
          label="Nagroda"
          type="text"
          value={this.state.prize}
          fullWidth
        />
        <Button onClick={this.saveAndExit} type="button">
          Zapisz i wróć
        </Button>
      </WinnerPanel>
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
