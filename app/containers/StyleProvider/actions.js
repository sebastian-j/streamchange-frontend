/*
 *
 * StyleProvider actions
 *
 */

import { CHANGE_COLOR, TOGGLE_DARK_MODE } from './constants';

export function changeColor(c) {
  return {
    type: CHANGE_COLOR,
    color: c,
  };
}

export function toggleDarkMode(darkMode) {
  return {
    type: TOGGLE_DARK_MODE,
    isDarkMode: darkMode,
  };
}
