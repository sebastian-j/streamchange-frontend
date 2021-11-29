import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  isOpen: false,
};

function supportInfoReducer(state: ContainerState = initialState, action: ContainerActions): ContainerState
{
  switch (action.type) {
    case ActionTypes.CHANGE_DIALOG_VISIBILITY:
      return {
        isOpen: action.payload
      };
    default:
      return state;
  }
}

export default supportInfoReducer;
