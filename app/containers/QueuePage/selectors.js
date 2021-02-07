import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the QueuePage state domain
 */
const selectQueue = state => state.queue || initialState;

const makeSelectCapacity = () =>
  createSelector(
    selectQueue,
    state => state.capacity,
  );

const makeSelectQueueCommand = () =>
  createSelector(
    selectQueue,
    state => state.command,
  );

const makeSelectTTI = () =>
  createSelector(
    selectQueue,
    state => state.timeToIdle,
  );

const makeSelectTTK = () =>
  createSelector(
    selectQueue,
    state => state.timeToKick,
  );

const makeSelectQueueArray = () =>
  createSelector(
    selectQueue,
    state => state.queueArray,
  );

export {
  selectQueue,
  makeSelectCapacity,
  makeSelectQueueCommand,
  makeSelectTTI,
  makeSelectTTK,
  makeSelectQueueArray,
};