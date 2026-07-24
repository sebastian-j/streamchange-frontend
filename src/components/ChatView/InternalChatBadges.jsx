import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BADGE_ORDER, BADGE_SETS } from './badgeSets';

const BadgeImg = styled.img`
  height: 18px;
  margin-right: 3px;
  vertical-align: middle;
`;

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
