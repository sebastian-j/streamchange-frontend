/*
 * UserList Messages
 *
 * This contains all the text for the UserList component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.UserList';

export default defineMessages({
  panelTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Users',
  },
  searchPlaceholder: {
    id: `${scope}.search.placeholder`,
    defaultMessage: 'Search',
  },
  clearBtn: {
    id: `${scope}.clearBtn`,
    defaultMessage: 'Clear all',
  },
  counter: {
    id: `${scope}.counter`,
    defaultMessage: '{selected} out of {all} are participating',
  },
});
