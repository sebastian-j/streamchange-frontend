/*
 *
 * QueuePage reducer
 *
 */
import produce from 'immer';

import ActionTypes from './constants';
import {
  deleteQueueItem,
  postQueueItem,
  updateQueueItem,
} from './remoteDatabase';

export const initialState = {
  capacity: parseInt(localStorage.getItem('queue-capacity'), 10) || 10,
  command: localStorage.getItem('queue-command') || '',
  queueArray: [],
  timeToIdle: parseInt(localStorage.getItem('queue-timeToIdle'), 10) || 600,
  timeToKick: parseInt(localStorage.getItem('queue-timeToKick'), 10) || 900,
  widgetCode: localStorage.getItem('queue-widget-code') || '',
};

/* eslint-disable default-case, no-param-reassign */
const queueReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.CHANGE_QUEUE_CAPACITY:
        draft.capacity = action.payload;
        break;
      case ActionTypes.CHANGE_QUEUE_COMMAND:
        draft.command = action.payload;
        break;
      case ActionTypes.CHANGE_QUEUE_TTI:
        draft.timeToIdle = action.payload;
        break;
      case ActionTypes.CHANGE_QUEUE_TTK:
        draft.timeToKick = action.payload;
        break;
      case ActionTypes.CHANGE_QUEUE_WIDGET_CODE:
        draft.widgetCode = action.payload;
        localStorage.setItem('queue-widget-code', action.payload);
        break;
      case ActionTypes.DELETE_QUEUE_ITEM:
        for (let i = 0; i < draft.queueArray.length; i += 1) {
          if (draft.queueArray[i].id === action.payload) {
            draft.queueArray.splice(i, 1);
          }
        }
        deleteQueueItem(action.payload);
        break;
      case ActionTypes.GET_QUEUE_FROM_DB:
        draft.queueArray = action.payload;
        break;
      case ActionTypes.PURGE_QUEUE:
        draft.queueArray = [];
        deleteQueueItem(null);
        break;
      case ActionTypes.PUSH_QUEUE_ITEM:
        for (let i = 0; i < draft.queueArray.length; i += 1) {
          if (draft.queueArray[i].id === action.payload.id) {
            draft.queueArray[i].lastActiveAt = action.payload.lastActiveAt;
            draft.queueArray[i].message = action.payload.message;
            updateQueueItem(action.payload);
            return;
          }
        }
        if (draft.capacity > draft.queueArray.length) {
          draft.queueArray.push(action.payload);
          postQueueItem(action.payload);
        }
        break;
      case ActionTypes.UPDATE_QUEUE_ITEM:
        for (let i = 0; i < draft.queueArray.length; i += 1) {
          if (draft.queueArray[i].id === action.payload.id) {
            draft.queueArray[i] = { ...draft.queueArray[i], ...action.payload };
            updateQueueItem(action.payload);
          }
        }
        break;
    }
  });

export default queueReducer;
