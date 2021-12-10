/*
 *
 * ChatView reducer
 *
 */

import ActionTypes from './constants';
import { ContainerActions, ContainerState } from './types';

export const initialState = {
  messages: [],
};

function chatReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      if (state.messages.length > 50) {
        state.messages.shift();
      }
      state.messages.push(action.payload);
      return {
        messages: state.messages.map((a) => ({ ...a })),
      };
    default:
      return state;
  }
}

export default chatReducer;
