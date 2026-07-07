/*
 *
 * StyleProvider reducer
 *
 */
import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  color: localStorage.getItem('themeColor') || '#0094ff',
  isDarkMode: localStorage.getItem('darkMode') === 'true',
};

/* eslint-disable default-case, no-param-reassign */
const styleProviderReducer = (
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState => {
  switch (action.type) {
    case ActionTypes.CHANGE_COLOR:
      return {
        color: action.payload,
        isDarkMode: state.isDarkMode,
      };
    case ActionTypes.TOGGLE_DARK_MODE:
      return {
        color: state.color,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default styleProviderReducer;
