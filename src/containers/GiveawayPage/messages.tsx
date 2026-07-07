/*
 * GiveawayPage Messages
 *
 * This contains all the text for the GiveawayPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.containers.GiveawayPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.title`,
    defaultMessage: 'StreamChange Giveaway',
  },
  historyLink: {
    id: `${scope}.HistoryWidget.ButtonText`,
    defaultMessage: 'Win history',
  },
  historyEmptyTooltip: {
    id: `${scope}.HistoryWidget.EmptyTooltip`,
    defaultMessage:
      'Winner history is stored here. History is currently empty.',
  },
  historyWidgetTableTitle: {
    id: `${scope}.HistoryWidget.TableTitle`,
    defaultMessage: 'Last winners',
  },
  historyWidgetWarningText: {
    id: `${scope}.HistoryWidget.WarningText`,
    defaultMessage:
      'Storing too long history can affect app performance. Clear winner history when you no longer need it.',
  },
  leaveStreamBtn: {
    id: `${scope}.leaveStreamBtn`,
    defaultMessage: 'Leave stream',
  },
});
