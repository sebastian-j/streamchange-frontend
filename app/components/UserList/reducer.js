/*
 *
 * UserList reducer
 *
 */
import produce from 'immer';

import ActionTypes from './constants';
import {
  changeUsersEligibility,
  insertOrUpdateItem,
  purgeUsersTable,
  toggleEligibleIDB,
} from './model';

export const initialState = {
  userArray: [],
};

/* eslint-disable default-case, no-param-reassign */
const userListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.DESELECT_ALL:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          draft.userArray[i].isEligible = false;
        }
        changeUsersEligibility(false);
        break;
      case ActionTypes.GET_LIST_FROM_IDB:
        draft.userArray = action.payload;
        break;
      case ActionTypes.PURGE_LIST:
        draft.userArray = [];
        purgeUsersTable();
        break;
      case ActionTypes.PUSH_USER:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          if (draft.userArray[i].id === action.payload.id) {
            draft.userArray[i].message = action.payload.isEligible
              ? action.payload.message
              : draft.userArray[i].message;
            draft.userArray[i].isEligible =
              draft.userArray[i].isEligible || action.payload.isEligible;
            return;
          }
        }
        draft.userArray.push(action.payload);
        insertOrUpdateItem(action.payload);
        break;
      case ActionTypes.SELECT_ALL:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          draft.userArray[i].isEligible = true;
        }
        changeUsersEligibility(true);
        break;
      case ActionTypes.TOGGLE_ELIGIBILITY:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          if (draft.userArray[i].id === action.payload) {
            draft.userArray[i].isEligible = !draft.userArray[i].isEligible;
          }
        }
        toggleEligibleIDB(action.payload);
    }
  });

export default userListReducer;
