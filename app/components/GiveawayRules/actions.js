/*
 *
 * GiveawayRules actions
 *
 */

import {
  CHANGE_KEYWORD,
  CHANGE_PARTICIPANT_REQUIREMENT,
  CHANGE_PREWINNER,
  CHANGE_PRIZE,
} from './constants';

export function changeKeyword(str) {
  return {
    type: CHANGE_KEYWORD,
    keyword: str,
  };
}

export function changePreWinner(w) {
  return {
    type: CHANGE_PREWINNER,
    preWinner: w,
  };
}

export function changePrize(str) {
  return {
    type: CHANGE_PRIZE,
    prize: str,
  };
}

export function changeRequirement(r) {
  return {
    type: CHANGE_PARTICIPANT_REQUIREMENT,
    requirement: r,
  };
}
