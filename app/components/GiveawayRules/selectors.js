import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the GiveawayRules state domain
 */
const selectRules = (state) => state.giveawayRules || initialState;

const makeSelectGiveawayKeyword = () =>
  createSelector(selectRules, (rulesState) => rulesState.keyword);

const makeSelectGiveawayPreWinner = () =>
  createSelector(selectRules, (rulesState) => rulesState.preWinner);

const makeSelectGiveawayPrize = () =>
  createSelector(selectRules, (rulesState) => rulesState.prize);

export {
  selectRules,
  makeSelectGiveawayKeyword,
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayPrize,
};
