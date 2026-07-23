/*
 * History Messages
 *
 * This contains all the text for the History container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.containers.History';

export default defineMessages({
  pageTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Winner history',
  },
  pageDescription: {
    id: `${scope}.pageDescription`,
    defaultMessage: 'Browse and search through every winner drawn so far.',
  },
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
  infoEmpty: {
    id: `${scope}.info.empty`,
    defaultMessage: "You don't have any winner history yet.",
  },
  resultsPerPage: {
    id: `${scope}.resultsPerPage`,
    defaultMessage: 'Results per page',
  },
  resultsSummary: {
    id: `${scope}.resultsSummary`,
    defaultMessage:
      'Showing {from}-{to} of {total} {total, plural, one {result} other {results}}',
  },
  pageIndicator: {
    id: `${scope}.pageIndicator`,
    defaultMessage: 'Page {page} of {totalPages}',
  },
  prevPageLabel: {
    id: `${scope}.prevPageLabel`,
    defaultMessage: 'Previous page',
  },
  nextPageLabel: {
    id: `${scope}.nextPageLabel`,
    defaultMessage: 'Next page',
  },
  returnButton: {
    id: `${scope}.ReturnButton`,
    defaultMessage: 'Back to giveaway',
  },
  searchLabel: {
    id: `${scope}.search.label`,
    defaultMessage: 'Search',
  },
  clearHistoryMenuItem: {
    id: `${scope}.HistoryMenu.clearHistory`,
    defaultMessage: 'Clear history',
  },
  clearHistoryCancelButton: {
    id: `${scope}.HistoryMenu.clearHistory.cancelButton`,
    defaultMessage: 'Cancel',
  },
  clearHistoryConfirmButton: {
    id: `${scope}.HistoryMenu.clearHistory.confirmButton`,
    defaultMessage: 'OK',
  },
  clearHistoryDialogContent: {
    id: `${scope}.HistoryMenu.clearHistory.dialogContentText`,
    defaultMessage: 'Are you sure you want to clear all winner history?',
  },
});
