import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the GiveawayRules state domain
 */
const selectRaffle = state => state.giveawayRules || initialState;

const makeSelectGiveawayKeyword = () =>
  createSelector(
    selectRaffle,
    rulesState => rulesState.keyword,
  );

const makeSelectGiveawayPrize = () =>
  createSelector(
    selectRaffle,
    rulesState => rulesState.prize,
  );

export { selectRaffle, makeSelectGiveawayKeyword, makeSelectGiveawayPrize };
