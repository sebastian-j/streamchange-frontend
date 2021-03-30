/*
 *
 * RaffleWrapper actions
 *
 */

import {
  CHANGE_ANIMATION,
  CHANGE_DURATION,
  CHANGE_VISIBILITY,
} from './constants';

export function changeAnimation(a) {
  return {
    type: CHANGE_ANIMATION,
    animationType: a,
  };
}

export function changeAnimationDuration(t) {
  return {
    type: CHANGE_DURATION,
    animationDuration: t,
  };
}

export function changeVisibility(v) {
  return {
    type: CHANGE_VISIBILITY,
    isOpen: v,
  };
}
