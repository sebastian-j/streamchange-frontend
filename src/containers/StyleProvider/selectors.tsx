import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the StyleProvider state domain
 */
const selectStyle = (state: ApplicationRootState) => state.theme || initialState;

const makeSelectColor = () =>
  createSelector(selectStyle, (themeState) => themeState.color);

const makeSelectDarkMode = () =>
  createSelector(selectStyle, (themeState) => themeState.isDarkMode);

export { selectStyle, makeSelectColor, makeSelectDarkMode };
