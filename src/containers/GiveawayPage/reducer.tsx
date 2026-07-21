/*
 *
 * GiveawayPage reducer
 *
 */
import ActionTypes from './constants';
import { ContainerActions, ContainerState } from './types';

export const initialState: ContainerState = {
  stream: {
    ownerId: '',
    thumbnailUrl: '',
    title: '',
    videoId: '',
  },
};

const giveawayPageReducer = (
  state: ContainerState = initialState,
  action: ContainerActions
): ContainerState => {
  switch (action.type) {
    case ActionTypes.CHANGE_STREAM_PROPERTIES:
      return {
        stream: action.payload,
      };
    default:
      return state;
  }
};

export default giveawayPageReducer;
