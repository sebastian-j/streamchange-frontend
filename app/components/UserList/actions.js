/*
 *
 * UserList actions
 *
 */

import {
  DESELECT_ALL,
  GET_LIST_FROM_IDB,
  PURGE_LIST,
  PUSH_USER,
  SELECT_ALL,
  TOGGLE_ELIGIBILITY,
  UPDATE_MESSAGE,
} from './constants';

export function selectAllUsers() {
  return {
    type: SELECT_ALL,
  };
}

export function getListFromIdb(arr) {
  return {
    type: GET_LIST_FROM_IDB,
    userArray: arr,
  };
}

export function purgeList() {
  return {
    type: PURGE_LIST,
  };
}

export function pushUser(item) {
  return {
    type: PUSH_USER,
    item,
  };
}

export function deselectAllUsers() {
  return {
    type: DESELECT_ALL,
  };
}

export function toggleEligibility(userId) {
  return {
    type: TOGGLE_ELIGIBILITY,
    userId,
  };
}

export function updateMessage(item) {
  return {
    type: UPDATE_MESSAGE,
    item,
  };
}
