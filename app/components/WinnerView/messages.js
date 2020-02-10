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
});
