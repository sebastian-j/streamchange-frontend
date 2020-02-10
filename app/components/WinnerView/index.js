import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import db from '../YoutubeWorker/db';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import MessageItem from './MessageItem';
import SubStatus from './SubStatus';
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
    };
    this.getMessages = this.getMessages.bind(this);
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
    this.getMessages();
    this.setState({ interval: setInterval(this.getMessages.bind(this), 3000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    if (!this.state.user) {
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
        <PanelTitle>
          <FormattedMessage {...messages.panelTitle} />
        </PanelTitle>
        <WinnerHeading>
          <Logo alt="logo" src={this.state.user.imageUrl} />
          <WinnerInfo>
            <WinnerTitle>{this.state.user.title}</WinnerTitle>
            <SubStatus
              apiKey={this.props.apiKey}
              id={this.props.id}
              ownerId={this.props.ownerId}
            />
            <ChannelLink
              href={`https://www.youtube.com/channel/${this.props.id}`}
              target="_blank"
            >
              <FormattedMessage {...messages.openChannel} />
            </ChannelLink>
          </WinnerInfo>
          <Timer />
        </WinnerHeading>
        <MessageList>
          {this.state.messages.map(item => (
            <MessageItem date={item.publishedAt} text={item.displayText} />
          ))}
        </MessageList>
        <FormattedMessage {...messages.prize}>
          {label => (
            <StyledTextField
              autoFocus
              margin="dense"
              name="prize"
              onChange={this.handleInputValueChange}
              label={label}
              type="text"
              value={this.state.prize}
              fullWidth
            />
          )}
        </FormattedMessage>
        <Button onClick={this.saveAndExit} type="button">
          <FormattedMessage {...messages.saveBtn} />
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
