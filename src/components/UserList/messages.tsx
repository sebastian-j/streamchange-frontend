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
  selectUsers: {
    id: `${scope}.selectAllMenuItem`,
    defaultMessage: 'Select all',
  },
  deselectUsers: {
    id: `${scope}.deselectAllMenuItem`,
    defaultMessage: 'Deselect all',
  },
  filtersTooltip: {
    id: `${scope}.filtersTooltip`,
    defaultMessage: 'Filters',
  },
  sponsorsFilter: {
    id: `${scope}.filters.sponsors`,
    defaultMessage: 'Sponsors',
  },
  moderatorsFilter: {
    id: `${scope}.filters.moderators`,
    defaultMessage: 'Moderators',
  },
  verifiedFilter: {
    id: `${scope}.filters.verified`,
    defaultMessage: 'Verified',
  },
  regularsFilter: {
    id: `${scope}.filters.regulars`,
    defaultMessage: 'Regular viewers',
  },
  selectedFilter: {
    id: `${scope}.filters.selected`,
    defaultMessage: 'Participating',
  },
  notSelectedFilter: {
    id: `${scope}.filters.notSelected`,
    defaultMessage: 'Not participating',
  },
  channelLinkTitle: {
    id: `${scope}.YoutubeLogo.title`,
    defaultMessage: 'Show the channel page',
  },
  skipListLinkText: {
    id: `${scope}.skipLink`,
    defaultMessage: 'Skip the viewers list',
  }
});
