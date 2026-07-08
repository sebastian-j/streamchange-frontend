import PropTypes from 'prop-types';
import styled from 'styled-components';

import kickBroadcaster from './assets/badges/kick/kick_broadcaster_badge.svg';
import kickModerator from './assets/badges/kick/kick_moderator_badge.svg';
import kickVip from './assets/badges/kick/kick_vip_badge.svg';
import kickSubscriber from './assets/badges/kick/kick_subscriber_default_badge.svg';

import twitchBroadcaster from './assets/badges/twitch/twitch_broadcaster_badge.svg';
import twitchModerator from './assets/badges/twitch/twitch_moderator_badge.svg';
import twitchVip from './assets/badges/twitch/twitch_vip_badge.svg';
import twitchSubscriber from './assets/badges/twitch/twitch_subscriber_badge.svg';

const BadgeImg = styled.img`
  height: 18px;
  margin-right: 3px;
  vertical-align: middle;
`;

export const BADGE_SETS = {
  kick: {
    broadcaster: kickBroadcaster,
    moderator: kickModerator,
    vip: kickVip,
    subscriber: kickSubscriber,
  },
  twitch: {
    broadcaster: twitchBroadcaster,
    moderator: twitchModerator,
    vip: twitchVip,
    subscriber: twitchSubscriber,
  },
};

// Badges are rendered left-to-right in this order, like on Twitch/Kick
const BADGE_ORDER = [
  { key: 'broadcaster', label: 'Broadcaster', isActive: (m) => m.isStreamer },
  { key: 'moderator', label: 'Moderator', isActive: (m) => m.isModerator },
  { key: 'vip', label: 'VIP', isActive: (m) => m.isVip },
  { key: 'subscriber', label: 'Subscriber', isActive: (m) => m.isSubscriber },
];

const InternalChatBadges = ({ message }) => {
  const badgeSet = BADGE_SETS[message.platform] || BADGE_SETS.twitch;

  return BADGE_ORDER.filter((badge) => badge.isActive(message)).map((badge) => (
    <BadgeImg
      key={badge.key}
      src={badgeSet[badge.key]}
      alt={badge.label}
      title={badge.label}
    />
  ));
};

InternalChatBadges.propTypes = {
  message: PropTypes.object.isRequired,
};

export default InternalChatBadges;
