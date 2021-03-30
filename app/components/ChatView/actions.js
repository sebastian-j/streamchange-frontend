/*
 *
 * ChatView actions
 *
 */

import { ADD_MESSAGE } from './constants';

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message,
  };
}
