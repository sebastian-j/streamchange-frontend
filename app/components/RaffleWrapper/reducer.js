/*
 *
 * RaffleWrapper reducer
 *
 */
import produce from 'immer';

import {
  CHANGE_ANIMATION,
  CHANGE_DURATION,
  CHANGE_VISIBILITY,
} from './constants';

export const initialState = {
  animationType: 0,
  animationDuration: Number(localStorage.getItem('gv-animationDuration')) || 7,
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const raffleWrapperReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_ANIMATION:
        draft.animationType = action.animationType;
        break;
      case CHANGE_DURATION:
        draft.animationDuration = action.animationDuration;
        localStorage.setItem(
          'gv-animationDuration',
          String(action.animationDuration),
        );
        break;
      case CHANGE_VISIBILITY:
        draft.isOpen = action.isOpen;
        break;
    }
  });

export default raffleWrapperReducer;
