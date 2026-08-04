/*
 *
 * UserList actions
 *
 */

import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { User } from './types';

export const selectAllUsers = () => action(ActionTypes.SELECT_ALL);

export const getListFromIdb = (userArray: User[]) =>
  action(ActionTypes.GET_LIST_FROM_IDB, userArray);

export const purgeList = () => action(ActionTypes.PURGE_LIST);

export const pushUser = (item: User) => action(ActionTypes.PUSH_USER, item);

export const deselectAllUsers = () => action(ActionTypes.DESELECT_ALL);

export const toggleEligibility = (userId: string) =>
  action(ActionTypes.TOGGLE_ELIGIBILITY, userId);
