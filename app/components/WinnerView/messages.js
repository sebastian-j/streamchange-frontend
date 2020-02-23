/*
 * WinnerView Messages
 *
 * This contains all the text for the WinnerView component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.WinnerView';

export default defineMessages({
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
