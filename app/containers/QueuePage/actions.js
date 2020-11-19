/*
 *
 * QueuePage actions
 *
 */

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

export function changeQueueCommand(command) {
  return {
    type: CHANGE_QUEUE_COMMAND,
    command,
  };
}

export function changeCapacity(capacity) {
  return {
    type: CHANGE_QUEUE_CAPACITY,
    capacity,
  };
}

export function changeTTI(time) {
  return {
    type: CHANGE_QUEUE_TTI,
    timeToIdle: time,
  };
}

export function changeTTK(time) {
  return {
    type: CHANGE_QUEUE_TTK,
    timeToKick: time,
  };
}

export function deleteQueueItem(id) {
  return {
    type: DELETE_QUEUE_ITEM,
    id,
  };
}

export function getQueueFromIdb(arr) {
  return {
    type: GET_QUEUE_FROM_IDB,
    queueArray: arr,
  };
}

export function purgeQueue() {
  return {
    type: PURGE_QUEUE,
  };
}

export function pushQueueItem(item) {
  return {
    type: PUSH_QUEUE_ITEM,
    item,
  };
}

export function updateQueueItem(item) {
  return {
    type: UPDATE_QUEUE_ITEM,
    item,
  };
}
