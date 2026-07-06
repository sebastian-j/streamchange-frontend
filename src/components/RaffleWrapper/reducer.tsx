/*
 *
 * RaffleWrapper reducer
 *
 */
import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  animationType: 0,
  animationDuration: Number(localStorage.getItem('gv-animationDuration')) || 7,
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
function raffleWrapperReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CHANGE_ANIMATION:
      return {
        animationType: action.payload,
        animationDuration: state.animationDuration,
        isOpen: state.isOpen,
      };
    case ActionTypes.CHANGE_DURATION:
      localStorage.setItem('gv-animationDuration', String(action.payload));
      return {
        animationType: state.animationType,
        animationDuration: action.payload,
        isOpen: state.isOpen,
      };
    case ActionTypes.CHANGE_VISIBILITY:
      return {
        animationType: state.animationType,
        animationDuration: state.animationDuration,
        isOpen: action.payload,
      };
    default:
      return state;
  }
}

export default raffleWrapperReducer;
