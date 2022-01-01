import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the QueuePage state domain
 */
const selectQueue = (state: ApplicationRootState) =>
  state.queue || initialState;

const makeSelectCapacity = () =>
  createSelector(selectQueue, (state) => state.capacity);

const makeSelectQueueCommand = () =>
  createSelector(selectQueue, (state) => state.command);

const makeSelectTTI = () =>
  createSelector(selectQueue, (state) => state.timeToIdle);

const makeSelectTTK = () =>
  createSelector(selectQueue, (state) => state.timeToKick);

const makeSelectWidgetCode = () =>
  createSelector(selectQueue, (state) => state.widgetCode);

const makeSelectQueueArray = () =>
  createSelector(selectQueue, (state) => state.queueArray);

export {
  selectQueue,
  makeSelectCapacity,
  makeSelectQueueCommand,
  makeSelectTTI,
  makeSelectTTK,
  makeSelectWidgetCode,
  makeSelectQueueArray,
};
