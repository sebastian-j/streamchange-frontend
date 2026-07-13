import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Tooltip from '@mui/material/Tooltip';

import messages from './messages';
import { changePreWinner } from '../GiveawayRules/actions';
import { changeVisibility } from '../RaffleWrapper/actions';
import db from '../YoutubeWorker/db';
import { API_URL } from '../../config';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import HintParagraph from '../Tooltip/HintParagraph';
import MessageItem from './MessageItem';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import Timer from './Timer';
import { makeSelectGiveawayPreWinner } from '../GiveawayRules/selectors';
import { makeSelectStreamInfo } from '../../containers/GiveawayPage/selectors';

const WinnerPanel = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  margin: 15px;
  min-width: 0;
  padding: 15px;
`;

const WinnerHeading = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
  > img {
    border-radius: 50%;
    flex-shrink: 0;
    height: 70px;
    object-fit: cover;
    width: 70px;
  }
  > span {
    align-self: flex-start;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }
  .nickRow {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    img {
      height: 22px;
    }
  }
`;

const AvatarFallback = styled.div`
  align-items: center;
  background: ${(props) => props.theme.iconButtonBackground};
  border-radius: 50%;
  color: ${(props) => props.userColor || props.theme.staticTextColor};
  display: flex;
  flex-shrink: 0;
  font-size: 32px;
  font-weight: 700;
  height: 70px;
  justify-content: center;
  user-select: none;
  width: 70px;
`;

const WinnerTitle = styled.span`
  color: ${(props) => props.userColor || props.theme.staticTextColor};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  overflow-wrap: anywhere;
`;

const SubscriptionMonths = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  font-size: 0.9rem;
  font-weight: 500;
`;

const ChannelLink = styled.a`
  align-self: flex-start;
  background: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 4px;
  color: ${(props) => props.theme.buttonTextColor};
  font-size: 0.9rem;
  margin-top: 4px;
  padding: 3px 8px;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.theme.buttonBackgroundHover};
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 4px;
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  margin-top: 20px;
  overflow: hidden;
  padding: 8px 5px;
  position: relative;
  text-decoration: none;
  transition: text-shadow 0.2s linear 0.3s;
  z-index: 0;
  .btn-hover {
    background-color: ${(props) => props.theme.color};
    clip-path: ellipse(50% 180% at 50% 310%);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: clip-path 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    width: 100%;
    z-index: -1;
  }
  &:hover {
    text-shadow: 0 0 5px ${(props) => props.theme.startButtonShadowColor};
    transition: text-shadow 0s;
    .btn-hover {
      clip-path: ellipse(120% 180% at 50% 60%);
    }
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
            <div className="btn-hover" />
          </Button>
        </WinnerPanel>
      );
    }
    return (
      <WinnerPanel>
        <FormattedMessage {...messages.pageTitle}>
          {(title) => (
            <Helmet>
              <title>{`${this.state.user.title} ${title}`}</title>
            </Helmet>
          )}
        </FormattedMessage>
        <PanelTitle>
          <FormattedMessage {...messages.panelTitle} />
        </PanelTitle>
        <WinnerHeading>
          {this.state.user.imageUrl ? (
            <img alt="logo" src={this.state.user.imageUrl} />
          ) : (
            <AvatarFallback userColor={this.state.user.color}>
              {this.state.user.title.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
          <div className="info">
            <div className="nickRow">
              <InternalChatBadges
                message={{
                  platform: this.state.user.platform,
                  badges: this.state.user.badges,
                }}
              />
              <WinnerTitle userColor={this.state.user.color}>
                {this.state.user.title}
              </WinnerTitle>
            </div>
            {this.state.user.subscriptionMonths > 0 && (
              <SubscriptionMonths>
                <FormattedMessage
                  {...messages.subscriptionMonths}
                  values={{ months: this.state.user.subscriptionMonths }}
                />
              </SubscriptionMonths>
            )}
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
            <div className="btn-hover" />
          </Button>
        </Tooltip>
        <Button onClick={this.saveAndExit} type="button">
          <FormattedMessage {...messages.saveBtn} />
          <div className="btn-hover" />
        </Button>
      </WinnerPanel>
    );
  }
}

WinnerView.propTypes = {
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
