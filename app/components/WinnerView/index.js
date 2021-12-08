import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'qs';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import { changePreWinner } from '../GiveawayRules/actions';
import { changeVisibility } from '../RaffleWrapper/actions';
import db from '../YoutubeWorker/db';
import { API_URL } from '../../config';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import HintParagraph from '../Tooltip/HintParagraph';
import MessageItem from './MessageItem';
import SubStatus from './SubStatus';
import Timer from './Timer';
import { makeSelectGiveawayPreWinner } from '../GiveawayRules/selectors';
import { makeSelectStreamInfo} from '../../containers/HomePage/selectors';

const WinnerPanel = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
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
  > img {
    height: 70px;
    width: 70px;
    margin-right: 10px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
`;

const WinnerTitle = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  font-size: 20px;
`;

const ChannelLink = styled.a`
  background: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  color: ${(props) => props.theme.buttonTextColor};
  border-radius: 4px;
  padding: 3px 5px;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.theme.buttonBackgroundHover};
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  color: ${(props) => props.theme.buttonTextColor};
  border-radius: 4px;
  margin-top: 20px;
  padding: 8px 5px;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.theme.buttonBackgroundHover};
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

const MessageList = styled.ul`
  overflow-y: auto;
  list-style: none;
  padding: 0;
`;

export class WinnerView extends React.Component {
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
    this.instantReplay = this.instantReplay.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  getMessages() {
    db.table('messages')
      .filter((message) => message.authorId === this.props.id)
      .toArray()
      .then((items) => {
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
      db.table('users').where('id').equals(winner.channelId).modify({
        isEligible: false,
      });
    }
    db.table('history')
      .add(winner)
      .finally(() => {
        this.props.onClose();
      });
  }

  instantReplay() {
    this.props.onRepeat();
    this.props.onClose();
  }

  handleInputValueChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  telemetry() {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const telemetryData = {
      id: sessionStorage.getItem('gv-videoId'),
      ownerId: this.props.streamInfo.ownerId,
      prize: this.state.prize,
      winnerId: this.props.id,
      part: 'winner',
      message: this.props.preWinner ? this.props.preWinner.message : null,
    };
    axios
      .post(`${API_URL}/v4/telemetry`, qs.stringify(telemetryData), config)
      .then(() => {
        this.props.changePreWinner(null);
      })
      .catch(() => {});
  }

  componentDidMount() {
    const userId = this.props.id;
    db.table('users')
      .filter((user) => user.id === userId)
      .toArray()
      .then((items) => {
        this.setState({ user: items[0] });
      });
    this.getMessages();
    this.telemetry();
    this.setState({ interval: setInterval(this.getMessages.bind(this), 3000) });
  }

  componentWillUnmount() {
    this.props.changePreWinner(null);
    clearInterval(this.state.interval);
  }

  render() {
    if (!this.state.user) {
      return (
        <WinnerPanel>
          <PanelTitle>
            <FormattedMessage {...messages.panelTitle} />
          </PanelTitle>
          <span>
            <FormattedMessage {...messages.loading} />
          </span>
          <Button onClick={this.props.onClose} type="button">
            <FormattedMessage {...messages.exitBtn} />
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
          <img alt="logo" src={this.state.user.imageUrl} />
          <div className="info">
            <WinnerTitle>{this.state.user.title}</WinnerTitle>
            <SubStatus apiKey={this.props.apiKey} id={this.props.id} />
            <ChannelLink
              href={`https://www.youtube.com/channel/${this.props.id}`}
              target="_blank"
            >
              <FormattedMessage {...messages.openChannel} />
            </ChannelLink>
          </div>
          <Timer />
        </WinnerHeading>
        <MessageList>
          {this.state.messages.map((item) => (
            <MessageItem date={item.publishedAt} text={item.displayText} />
          ))}
        </MessageList>
        <FormattedMessage {...messages.prize}>
          {(label) => (
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
        <Tooltip
          title={
            <HintParagraph>
              <FormattedMessage {...messages.replayBtnTooltip} />
            </HintParagraph>
          }
        >
          <Button onClick={this.instantReplay} type="button">
            <FormattedMessage {...messages.replayBtn} />
          </Button>
        </Tooltip>
        <Button onClick={this.saveAndExit} type="button">
          <FormattedMessage {...messages.saveBtn} />
        </Button>
      </WinnerPanel>
    );
  }
}

WinnerView.propTypes = {
  apiKey: PropTypes.string.isRequired,
  changePreWinner: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  preWinner: PropTypes.object,
  prize: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onRepeat: PropTypes.func.isRequired,
  streamInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  preWinner: makeSelectGiveawayPreWinner(),
  streamInfo: makeSelectStreamInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changePreWinner: (w) => dispatch(changePreWinner(w)),
    onRepeat: () => dispatch(changeVisibility(true)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WinnerView);
