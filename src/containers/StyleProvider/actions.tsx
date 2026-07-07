/*
 *
 * StyleProvider actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const changeColor = (color: string) =>
  action(ActionTypes.CHANGE_COLOR, color);

export const toggleDarkMode = (isDarkMode: boolean) =>
  action(ActionTypes.TOGGLE_DARK_MODE, isDarkMode);
