/*
 *
 * GiveawayRules actions
 *
 */

import { CHANGE_KEYWORD, CHANGE_PRIZE } from './constants';

export function changeKeyword(str) {
  return {
    type: CHANGE_KEYWORD,
    keyword: str,
  };
}

export function changePrize(str) {
  return {
    type: CHANGE_PRIZE,
    prize: str,
  };
}
