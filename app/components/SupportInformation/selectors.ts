import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the SupportInformation state domain
 */
const selectSupportInfo = (state: ApplicationRootState) => state.supportInfo || initialState;

const makeSelectDialogVisibility = () =>
  createSelector(selectSupportInfo, (state) => state.isOpen);

export { selectSupportInfo, makeSelectDialogVisibility };
