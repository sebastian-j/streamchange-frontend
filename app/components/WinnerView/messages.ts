/*
 * WinnerView Messages
 *
 * This contains all the text for the WinnerView component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.WinnerView';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'wins the draw',
  },
  panelTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Winner',
  },
  exitBtn: {
    id: `${scope}.exitBtn`,
    defaultMessage: 'Return',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Loading...',
  },
  openChannel: {
    id: `${scope}.openChannel`,
    defaultMessage: 'Open channel page',
  },
  prize: {
    id: `${scope}.prize`,
    defaultMessage: 'Prize',
  },
  saveBtn: {
    id: `${scope}.saveBtn`,
    defaultMessage: 'Save and return',
  },
  replayBtn: {
    id: `${scope}.replayBtn`,
    defaultMessage: 'Repeat the draw',
  },
  replayBtnTooltip: {
    id: `${scope}.replayBtnTooltip`,
    defaultMessage:
      'Repeats the draw immediately using the same settings. Current winner won\'t be saved in history.',
  },
  notSubscribed: {
    id: `${scope}.SubStatus.notSubscribed`,
    defaultMessage: 'Not subscribed',
  },
  subscriberPrivate: {
    id: `${scope}.SubStatus.privateSub`,
    defaultMessage: 'Subscription list private',
  },
  subscriberFrom: {
    id: `${scope}.SubStatus.subscriberFrom`,
    defaultMessage: 'Subscriber from',
  },
  subscriberUnknown: {
    id: `${scope}.SubStatus.unknownSubscriber`,
    defaultMessage: 'Subscription status unknown',
  },
});
