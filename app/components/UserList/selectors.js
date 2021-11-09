import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the UserList state domain
 */
const selectUserList = (state) => state.userList || initialState;

const makeSelectUserArray = () =>
  createSelector(selectUserList, (state) => state.userArray);

export { selectUserList, makeSelectUserArray };
