/*
 *
 * GiveawayRules reducer
 *
 */
import ActionTypes from './constants';
import { ContainerActions, ContainerState } from './types';

export const initialState: ContainerState = {
  keyword: localStorage.getItem('keyword') || '',
  preWinner: null,
  prize: localStorage.getItem('gv-prize') || '',
  requirement: 0,
};

/* eslint-disable default-case, no-param-reassign */
function giveawayRulesReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CHANGE_KEYWORD:
      localStorage.setItem('keyword', action.payload);
      return {
        keyword: action.payload,
        preWinner: state.preWinner,
        prize: state.prize,
        requirement: state.requirement,
      };
    case ActionTypes.CHANGE_PREWINNER:
      return {
        keyword: state.keyword,
        preWinner: action.payload,
        prize: state.prize,
        requirement: state.requirement,
      };
    case ActionTypes.CHANGE_PRIZE:
      localStorage.setItem('gv-prize', action.payload);
      return {
        keyword: state.keyword,
        preWinner: state.preWinner,
        prize: action.payload,
        requirement: state.requirement,
      };
    case ActionTypes.CHANGE_PARTICIPANT_REQUIREMENT:
      return {
        keyword: state.keyword,
        preWinner: state.preWinner,
        prize: state.prize,
        requirement: action.payload,
      };
    default:
      return state;
  }
}

export default giveawayRulesReducer;
