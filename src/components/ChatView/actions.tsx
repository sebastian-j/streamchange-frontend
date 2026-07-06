/*
 *
 * ChatView actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { ChatMessage } from './types';

export const addMessage = (message: ChatMessage) =>
  action(ActionTypes.ADD_MESSAGE, message);
