import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the HomePage state domain
 */
const selectHomePage = (state) => state.streamInfo || initialState;

const makeSelectOwnerId = () =>
  createSelector(selectHomePage, (state) => state.ownerId);

const makeSelectThumbnailUrl = () =>
  createSelector(selectHomePage, (state) => state.thumbnailUrl);

const makeSelectTitle = () =>
  createSelector(selectHomePage, (state) => state.title);

const makeSelectVideoId = () =>
  createSelector(selectHomePage, (state) => state.videoId);

export {
  selectHomePage,
  makeSelectOwnerId,
  makeSelectThumbnailUrl,
  makeSelectTitle,
  makeSelectVideoId,
};
