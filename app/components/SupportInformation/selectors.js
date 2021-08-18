import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the SupportInformation state domain
 */
const selectSupportInfo = (state) => state.supportInfo || initialState;

const makeSelectDialogVisibility = () =>
  createSelector(selectSupportInfo, (state) => state.isOpen);

export { selectSupportInfo, makeSelectDialogVisibility };
