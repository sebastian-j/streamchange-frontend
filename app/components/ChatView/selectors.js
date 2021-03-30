import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ChatView state domain
 */
const selectChat = state => state.chat || initialState;

const makeSelectMessages = () =>
  createSelector(
    selectChat,
    state => state.messages,
  );

export { selectChat, makeSelectMessages };
