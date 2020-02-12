/*
 * History Messages
 *
 * This contains all the text for the History container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.containers.History';

export default defineMessages({
  dateHeader: {
    id: `${scope}.header.date`,
    defaultMessage: 'Date and time',
  },
  messageHeader: {
    id: `${scope}.header.message`,
    defaultMessage: 'Message',
  },
  nameHeader: {
    id: `${scope}.header.name`,
    defaultMessage: 'Channel name',
  },
  prizeHeader: {
    id: `${scope}.header.prize`,
    defaultMessage: 'Prize',
  },
  infoError: {
    id: `${scope}.info.error`,
    defaultMessage: 'Cannot load list',
  },
  infoLoading: {
    id: `${scope}.info.loading`,
    defaultMessage: 'Loading history',
  },
  infoNoResults: {
    id: `${scope}.info.noResults`,
    defaultMessage: 'No channel match the search term',
  },
  resultsPerPage: {
    id: `${scope}.resultsPerPage`,
    defaultMessage: 'Results per page',
  },
  returnButton: {
    id: `${scope}.ReturnButton`,
    defaultMessage: 'Back to giveaway',
  },
  searchLabel: {
    id: `${scope}.search.label`,
    defaultMessage: 'Search',
  },
});
