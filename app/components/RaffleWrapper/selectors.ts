import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the RaffleWrapper state domain
 */
const selectRaffle = (state: ApplicationRootState) =>
  state.raffleWrapper || initialState;

const makeSelectAnimation = () =>
  createSelector(selectRaffle, (raffleState) => raffleState.animationType);

const makeSelectDuration = () =>
  createSelector(selectRaffle, (raffleState) => raffleState.animationDuration);

const makeSelectVisibility = () =>
  createSelector(selectRaffle, (raffleState) => raffleState.isOpen);

export {
  selectRaffle,
  makeSelectAnimation,
  makeSelectDuration,
  makeSelectVisibility,
};
