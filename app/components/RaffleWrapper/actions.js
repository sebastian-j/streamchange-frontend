/*
 *
 * RaffleWrapper actions
 *
 */

import { CHANGE_ANIMATION, CHANGE_VISIBILITY } from './constants';

export function changeAnimation(a) {
  return {
    type: CHANGE_ANIMATION,
    animationType: a,
  };
}

export function changeVisibility(v) {
  return {
    type: CHANGE_VISIBILITY,
    isOpen: v,
  };
}
