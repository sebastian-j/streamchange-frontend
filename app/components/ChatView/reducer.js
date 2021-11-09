/*
 *
 * ChatView reducer
 *
 */
import produce from 'immer';

import { ADD_MESSAGE } from './constants';

export const initialState = {
  messages: [],
};

/* eslint-disable default-case, no-param-reassign */
const chatReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_MESSAGE:
        if (draft.messages.length > 50) {
          draft.messages.shift();
        }
        draft.messages.push(action.message);
        break;
    }
  });

export default chatReducer;
