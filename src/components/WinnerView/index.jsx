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
import { API_URL, BACKEND_URL } from '../../config';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import HintParagraph from '../Tooltip/HintParagraph';
import MessageItem from './MessageItem';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import Timer from './Timer';
import { makeSelectGiveawayPreWinner } from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
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
  color: ${(props) => props.$userColor || props.theme.staticTextColor};
  display: flex;
  flex-shrink: 0;
  font-size: 32px;
  font-weight: 700;
  height: 70px;
  justify-content: center;
  user-select: none;
  width: 70px;
`;

const AvatarSkeleton = styled.div`
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.iconButtonBackground} 0%,
    ${(props) => props.theme.panelBackground} 50%,
    ${(props) => props.theme.iconButtonBackground} 100%
  );
  background-size: 200% 100%;
  border-radius: 50%;
  flex-shrink: 0;
  height: 70px;
  width: 70px;
  animation: avatar-skeleton-shimmer 1.4s ease-in-out infinite;

  @keyframes avatar-skeleton-shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

const WinnerTitle = styled.span`
  color: ${(props) => props.$userColor || props.theme.staticTextColor};
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

const ChannelLink = styled(Button)`
  align-self: flex-start;
  font-size: 0.9rem;
  margin-top: 4px;
  padding: 3px 8px;
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
      avatarUrl: null,
      avatarLoading: false,
      messages: [],
      interval: null,
      prize: this.props.prize,
    };
    this.avatarAbortController = null;
    this.avatarTimeoutId = null;
    this.getMessages = this.getMessages.bind(this);
    this.saveAndExit = this.saveAndExit.bind(this);
    this.instantReplay = this.instantReplay.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.fetchAvatar = this.fetchAvatar.bind(this);
    this.clearAvatarRequest = this.clearAvatarRequest.bind(this);
  }

  clearAvatarRequest() {
    if (this.avatarAbortController) {
      this.avatarAbortController.abort();
      this.avatarAbortController = null;
    }
    if (this.avatarTimeoutId) {
      clearTimeout(this.avatarTimeoutId);
      this.avatarTimeoutId = null;
    }
  }

  fetchAvatar(user) {
    this.clearAvatarRequest();

    const platform = user.platform || localStorage.getItem('gv-platform') || '';
    if (!user.userId || (platform !== 'twitch' && platform !== 'kick')) {
      this.setState({ avatarLoading: false, avatarUrl: null });
      return;
    }

    const abortController = new AbortController();
    this.avatarAbortController = abortController;

    this.setState({ avatarLoading: true, avatarUrl: null });

    this.avatarTimeoutId = setTimeout(() => {
      if (!abortController.signal.aborted) {
        abortController.abort();
        this.setState({ avatarLoading: false });
      }
    }, 3000);

    axios
      .get(`${BACKEND_URL}/api/avatar`, {
        params: { user_id: user.userId, platform },
        signal: abortController.signal,
      })
      .then((res) => {
        if (abortController.signal.aborted) {
          return;
        }
        clearTimeout(this.avatarTimeoutId);
        this.avatarTimeoutId = null;
        if (res.data?.url) {
          this.setState({ avatarUrl: res.data.url, avatarLoading: false });
        } else {
          this.setState({ avatarLoading: false });
        }
      })
      .catch((err) => {
        if (abortController.signal.aborted || err.code === 'ERR_CANCELED') {
          return;
        }
        clearTimeout(this.avatarTimeoutId);
        this.avatarTimeoutId = null;
        this.setState({ avatarLoading: false });
      });
  }

  resolveUser(idbUser) {
    const fromRedux = this.props.userArray.find(
      (user) => user.id === this.props.id
    );

    return {
      ...idbUser,
      ...fromRedux,
      platform:
        fromRedux?.platform ||
        idbUser?.platform ||
        localStorage.getItem('gv-platform') ||
        '',
      userId: fromRedux?.userId || idbUser?.userId || null,
    };
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
      imageUrl: this.state.avatarUrl || '',
      message: this.state.user.message,
      prize: this.state.prize,
      platform: this.state.user.platform,
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
        const user = this.resolveUser(items[0]);
        if (!user?.id) {
          return;
        }
        this.setState({ user });
        this.fetchAvatar(user);
      });
    this.getMessages();
    this.telemetry();
    this.setState({ interval: setInterval(this.getMessages.bind(this), 3000) });
  }

  componentDidUpdate(prevProps) {
    if (!this.state.user) {
      return;
    }

    const prevEntry = prevProps.userArray.find(
      (user) => user.id === this.props.id
    );
    const currentEntry = this.props.userArray.find(
      (user) => user.id === this.props.id
    );
    const gotUserId = !prevEntry?.userId && currentEntry?.userId;

    if (gotUserId && !this.state.avatarUrl && !this.state.avatarLoading) {
      const user = this.resolveUser(this.state.user);
      this.setState({ user }, () => this.fetchAvatar(user));
    }
  }

  componentWillUnmount() {
    this.clearAvatarRequest();
    this.props.changePreWinner(null);
    clearInterval(this.state.interval);
  }
  textReplace = (channelId) => {
    let channelIDKick = channelId.replaceAll('_', '-');
    return channelIDKick;
  };
  platformChoose() {
    if (this.state.user.platform === 'twitch') {
      return (
        <ChannelLink
          as="a"
          href={`https://www.twitch.tv/${this.props.id}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FormattedMessage {...messages.openChannel} />
          <div className="btn-hover" />
        </ChannelLink>
      );
    }
    return (
      <ChannelLink
        as="a"
        href={`https://kick.com/${this.textReplace(this.props.id)}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <FormattedMessage {...messages.openChannel} />
        <div className="btn-hover" />
      </ChannelLink>
    );
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
          {this.state.avatarUrl ? (
            <img alt={this.state.user.title} src={this.state.avatarUrl} />
          ) : this.state.avatarLoading ? (
            <AvatarSkeleton aria-hidden="true" />
          ) : (
            <AvatarFallback $userColor={this.state.user.color}>
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
              <WinnerTitle $userColor={this.state.user.color}>
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
            {this.platformChoose()}
          </div>
          <Timer />
        </WinnerHeading>
        <MessageList>
          {this.state.messages.map((item) => (
            <MessageItem
              key={item.id}
              date={item.publishedAt}
              text={item.displayText}
              fragments={item.fragments}
            />
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
  userArray: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  onRepeat: PropTypes.func.isRequired,
  streamInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  preWinner: makeSelectGiveawayPreWinner(),
  streamInfo: makeSelectStreamInfo(),
  userArray: makeSelectUserArray(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changePreWinner: (w) => dispatch(changePreWinner(w)),
    onRepeat: () => dispatch(changeVisibility(true)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WinnerView);
