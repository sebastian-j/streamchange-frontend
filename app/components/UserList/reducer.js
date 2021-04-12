/*
 *
 * UserList reducer
 *
 */
import produce from 'immer';

import {
  DESELECT_ALL,
  GET_LIST_FROM_IDB,
  PURGE_LIST,
  PUSH_USER,
  SELECT_ALL,
  TOGGLE_ELIGIBILITY,
  UPDATE_MESSAGE,
} from './constants';
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
      case DESELECT_ALL:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          draft.userArray[i].isEligible = false;
        }
        changeUsersEligibility(false);
        break;
      case GET_LIST_FROM_IDB:
        draft.userArray = action.userArray;
        break;
      case PURGE_LIST:
        draft.userArray = [];
        purgeUsersTable();
        break;
      case PUSH_USER:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          if (draft.userArray[i].id === action.item.id) {
            draft.userArray[i].message = action.item.isEligible
              ? action.item.message
              : draft.userArray[i].message;
            draft.userArray[i].isEligible =
              draft.userArray[i].isEligible || action.item.isEligible;
            return;
          }
        }
        draft.userArray.push(action.item);
        insertOrUpdateItem(action.item);
        break;
      case SELECT_ALL:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          draft.userArray[i].isEligible = true;
        }
        changeUsersEligibility(true);
        break;
      case UPDATE_MESSAGE:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          if (draft.userArray[i].id === action.item.id) {
            draft.userArray[i] = {
              ...draft.userArray[i],
              message: action.item.message,
            };
          }
        }
        insertOrUpdateItem(action.item);
        break;
      case TOGGLE_ELIGIBILITY:
        for (let i = 0; i < draft.userArray.length; i += 1) {
          if (draft.userArray[i].id === action.userId) {
            draft.userArray[i].isEligible = !draft.userArray[i].isEligible;
          }
        }
        toggleEligibleIDB(action.userId);
    }
  });

export default userListReducer;
