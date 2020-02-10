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
  moderators: {
    id: `${scope}.moderators`,
    defaultMessage: 'Moderators',
  },
  sponsors: {
    id: `${scope}.sponsors`,
    defaultMessage: 'Sponsors',
  },
  regulars: {
    id: `${scope}.regulars`,
    defaultMessage: 'Regulars',
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
