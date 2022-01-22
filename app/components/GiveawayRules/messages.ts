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
  repeatedCommandsError: {
    id: `${scope}.KeywordInput.error.repeatedCommands`,
    defaultMessage: 'Keyword should not contain resignation command.',
  },
  keyword: {
    id: `${scope}.KeywordInput.label`,
    defaultMessage: 'Keyword',
  },
  keywordTooltip: {
    id: `${scope}.KeywordInput.tooltip`,
    defaultMessage:
      'A viewer have to send this command in a chat message to join a draw',
  },
  keywordVisibility: {
    id: `${scope}.KeywordInput.visibility`,
    defaultMessage: 'Toggle keyword visibility',
  },
  lawTitle: {
    id: `${scope}.LotteryLawWarning.title`,
    defaultMessage: 'Remember to obey the law',
  },
  lawContent: {
    id: `${scope}.LotteryLawWarning.content`,
    defaultMessage: 'When organizing a lottery for your channel members, be sure to follow Youtube membership policy and the Gambling Act. You can read how to run a legal lottery in the Streamchange documentation.',
  },
  lawOpenDocs: {
    id: `${scope}.LotteryLawWarning.openDocs`,
    defaultMessage: 'Open the documentation',
  },
  lawClose: {
    id: `${scope}.LotteryLawWarning.close`,
    defaultMessage: 'I understand',
  },
  prize: {
    id: `${scope}.prize`,
    defaultMessage: 'Prize (optional)',
  },
});
