/*
 *
 * QueuePage actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { QueueItem } from './types';

export const changeQueueCommand = (command: string) =>
  action(ActionTypes.CHANGE_QUEUE_COMMAND, command);

export const changeCapacity = (capacity: number) =>
  action(ActionTypes.CHANGE_QUEUE_CAPACITY, capacity);

export const changeTTI = (timeToIdle: number) =>
  action(ActionTypes.CHANGE_QUEUE_TTI, timeToIdle);

export const changeTTK = (timeToKick: number) =>
  action(ActionTypes.CHANGE_QUEUE_TTK, timeToKick);

export const changeWidgetCode = (widgetCode: string) =>
  action(ActionTypes.CHANGE_QUEUE_WIDGET_CODE, widgetCode);

export const deleteQueueItem = (id: string) =>
  action(ActionTypes.DELETE_QUEUE_ITEM, id);

export const getQueueFromIdb = (queueArray: any[]) =>
  action(ActionTypes.GET_QUEUE_FROM_DB, queueArray);

export const purgeQueue = () => action(ActionTypes.PURGE_QUEUE);

export const pushQueueItem = (item: QueueItem) =>
  action(ActionTypes.PUSH_QUEUE_ITEM, item);

export const updateQueueItem = (item: any) =>
  action(ActionTypes.UPDATE_QUEUE_ITEM, item);
