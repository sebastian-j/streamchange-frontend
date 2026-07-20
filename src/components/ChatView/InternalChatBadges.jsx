import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BADGE_SETS } from './badgeSets';

const BadgeImg = styled.img`
  height: 18px;
  margin-right: 3px;
  vertical-align: middle;
`;

// Badges are rendered left-to-right in this order, like on Twitch/Kick
const BADGE_ORDER = [
  { key: 'broadcaster', label: 'Broadcaster' },
  { key: 'moderator', label: 'Moderator' },
  { key: 'vip', label: 'VIP' },
  { key: 'founder', label: 'Founder' },
  { key: 'subscriber', label: 'Subscriber' },
  { key: 'certified', label: 'Certified' },
  { key: 'og', label: 'OG' },
  { key: 'bot', label: 'Bot' },
];

const InternalChatBadges = ({ message }) => {
  const badgeSet = BADGE_SETS[message.platform] || BADGE_SETS.twitch;
  const badges = message.badges || [];

  return BADGE_ORDER.filter(
    (badge) => badges.includes(badge.key) && badgeSet[badge.key]
  ).map((badge) => (
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
