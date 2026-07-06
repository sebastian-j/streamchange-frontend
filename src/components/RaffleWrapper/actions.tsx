/*
 *
 * RaffleWrapper actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const changeAnimation = (animationType: number) =>
  action(ActionTypes.CHANGE_ANIMATION, animationType);

export const changeAnimationDuration = (animationDuration: number) =>
  action(ActionTypes.CHANGE_DURATION, animationDuration);

export const changeVisibility = (isOpen: boolean) =>
  action(ActionTypes.CHANGE_VISIBILITY, isOpen);
