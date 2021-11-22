/*
 *
 * LanguageProvider reducer
 *
 */
import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState: ContainerState = {
  locale: localStorage.getItem('locale')
    ? String(localStorage.getItem('locale'))
    : DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOCALE:
      return {
        locale: action.payload,
      };
    default:
      return state;
  }
};

export default languageProviderReducer;
