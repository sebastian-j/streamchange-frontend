import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the UserList state domain
 */
const selectUserList = (state: ApplicationRootState) =>
  state.userList || initialState;

const makeSelectUserArray = () =>
  createSelector(selectUserList, (state) => state.userArray);

export { selectUserList, makeSelectUserArray };
