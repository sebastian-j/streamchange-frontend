/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.containers.HomePage';

export default defineMessages({
  historyLink: {
    id: `${scope}.historyLink`,
    defaultMessage: 'Win history',
  },
  leaveStreamBtn: {
    id: `${scope}.leaveStreamBtn`,
    defaultMessage: 'Leave stream',
  },
});
