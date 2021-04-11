/*
 * GiveawayRules Messages
 *
 * This contains all the text for the GiveawayRules component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.GiveawayRules';

export default defineMessages({
  panelTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Giveaway rules',
  },
  allViewers: {
    id: `${scope}.forAll`,
    defaultMessage: 'All viewers',
  },
  sponsors: {
    id: `${scope}.forSponsors`,
    defaultMessage: 'Sponsors only',
  },
  userTypeLabel: {
    id: `${scope}.userTypeLabel`,
    defaultMessage: 'Who can participate in raffle',
  },
  keyword: {
    id: `${scope}.KeywordInput.label`,
    defaultMessage: 'Keyword',
  },
  keywordVisibility: {
    id: `${scope}.KeywordInput.visibility`,
    defaultMessage: 'Toggle keyword visibility',
  },
  prize: {
    id: `${scope}.prize`,
    defaultMessage: 'Prize (optional)',
  },
});
