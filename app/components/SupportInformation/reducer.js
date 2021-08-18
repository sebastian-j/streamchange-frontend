/*
 *
 * SupportInformation reducer
 *
 */
import produce from 'immer';

import { CHANGE_DIALOG_VISIBILITY } from './constants';

export const initialState = {
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const supportInfoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_DIALOG_VISIBILITY:
        draft.isOpen = action.isOpen;
        break;
    }
  });

export default supportInfoReducer;
