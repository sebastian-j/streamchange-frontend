/*
 *
 * GiveawayRules reducer
 *
 */
import produce from 'immer';

import {
  CHANGE_KEYWORD,
  CHANGE_PARTICIPANT_REQUIREMENT,
  CHANGE_PREWINNER,
  CHANGE_PRIZE,
} from './constants';

export const initialState = {
  keyword: localStorage.getItem('keyword') || '',
  preWinner: null,
  prize: localStorage.getItem('gv-prize') || '',
  requirement: 0,
};

/* eslint-disable default-case, no-param-reassign */
const giveawayRulesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_KEYWORD:
        draft.keyword = action.keyword;
        localStorage.setItem('keyword', action.keyword);
        break;
      case CHANGE_PREWINNER:
        draft.preWinner = action.preWinner;
        break;
      case CHANGE_PRIZE:
        draft.prize = action.prize;
        localStorage.setItem('gv-prize', action.prize);
        break;
      case CHANGE_PARTICIPANT_REQUIREMENT:
        draft.requirement = action.requirement;
        break;
    }
  });

export default giveawayRulesReducer;
