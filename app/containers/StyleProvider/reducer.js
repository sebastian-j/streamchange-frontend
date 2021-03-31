/*
 *
 * StyleProvider reducer
 *
 */
import produce from 'immer';

import { CHANGE_COLOR, TOGGLE_DARK_MODE } from './constants';

export const initialState = {
  color: localStorage.getItem('themeColor') || '#0094ff',
  isDarkMode: localStorage.getItem('darkMode') === 'true',
};

/* eslint-disable default-case, no-param-reassign */
const styleProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_COLOR:
        draft.color = action.color;
        break;
      case TOGGLE_DARK_MODE:
        draft.isDarkMode = action.isDarkMode;
        break;
    }
  });

export default styleProviderReducer;
