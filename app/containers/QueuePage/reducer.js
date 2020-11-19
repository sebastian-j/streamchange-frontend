/*
 *
 * QueuePage reducer
 *
 */
import produce from 'immer';

import {
  CHANGE_QUEUE_CAPACITY,
  CHANGE_QUEUE_COMMAND,
  CHANGE_QUEUE_TTI,
  CHANGE_QUEUE_TTK,
  DELETE_QUEUE_ITEM,
  GET_QUEUE_FROM_IDB,
  PURGE_QUEUE,
  PUSH_QUEUE_ITEM,
  UPDATE_QUEUE_ITEM,
} from './constants';
import { deleteItem, insertOrUpdateItem, purgeQueueTable } from './model';

export const initialState = {
  capacity: parseInt(localStorage.getItem('queue-capacity'), 10) || 10,
  command: localStorage.getItem('queue-command') || '',
  queueArray: [],
  timeToIdle: parseInt(localStorage.getItem('queue-timeToIdle'), 10) || 600,
  timeToKick: parseInt(localStorage.getItem('queue-timeToKick'), 10) || 900,
};

/* eslint-disable default-case, no-param-reassign */
const queueReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_QUEUE_CAPACITY:
        draft.capacity = action.capacity;
        break;
      case CHANGE_QUEUE_COMMAND:
        draft.command = action.command;
        break;
      case CHANGE_QUEUE_TTI:
        draft.timeToIdle = action.timeToIdle;
        break;
      case CHANGE_QUEUE_TTK:
        draft.timeToKick = action.timeToKick;
        break;
      case DELETE_QUEUE_ITEM:
        for (let i = 0; i < draft.queueArray.length; i += 1) {
          if (draft.queueArray[i].id === action.id) {
            draft.queueArray.splice(i, 1);
          }
        }
        deleteItem(action.id);
        break;
      case GET_QUEUE_FROM_IDB:
        draft.queueArray = action.queueArray;
        break;
      case PURGE_QUEUE:
        draft.queueArray = [];
        purgeQueueTable();
        break;
      case PUSH_QUEUE_ITEM:
        for (let i = 0; i < draft.queueArray.length; i += 1) {
          if (draft.queueArray[i].id === action.item.id) {
            return;
          }
        }
        draft.queueArray.push(action.item);
        insertOrUpdateItem(action.item);
        break;
      case UPDATE_QUEUE_ITEM:
        for (let i = 0; i < draft.queueArray.length; i += 1) {
          if (draft.queueArray[i].id === action.item.id) {
            draft.queueArray[i] = { ...draft.queueArray[i], ...action.item };
          }
        }
        insertOrUpdateItem(action.item);
        break;
    }
  });

export default queueReducer;
