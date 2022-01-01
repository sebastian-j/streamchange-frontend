import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the GiveawayPage state domain
 */
const selectGiveawayPage = (state: ApplicationRootState) =>
  state.giveawayPage || initialState;

const makeSelectAuthKey = () =>
  createSelector(selectGiveawayPage, (state) => state.authKey);

const makeSelectBanStatus = () =>
  createSelector(selectGiveawayPage, (state) => state.ban);

const makeSelectStreamInfo = () =>
  createSelector(selectGiveawayPage, (state) => state.stream);

export {
  selectGiveawayPage,
  makeSelectAuthKey,
  makeSelectBanStatus,
  makeSelectStreamInfo,
};
