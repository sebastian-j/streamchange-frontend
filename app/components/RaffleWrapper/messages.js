/*
 * RaffleWrapper Messages
 *
 * This contains all the text for the RaffleWrapper component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.RaffleWrapper';

export default defineMessages({
  animationDuration: {
    id: `${scope}.animationDuration`,
    defaultMessage: 'Animation duration (seconds)',
  },
  noUserSelected: {
    id: `${scope}.noUserSelected`,
    defaultMessage: 'No user selected',
  },
  startBtn: {
    id: `${scope}.startBtn`,
    defaultMessage: 'Roll it!',
  },
});
