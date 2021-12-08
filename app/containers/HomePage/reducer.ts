/*
 *
 * HomePage reducer
 *
 */
import ActionTypes from './constants';
import { ContainerActions, ContainerState } from './types';

export const initialState: ContainerState = {
  authKey: '',
  ban: null,
  stream: {
    ownerId: '',
    thumbnailUrl: '',
    title: '',
    videoId: '',
  },
};

const giveawayPageReducer = (
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState => {
  switch (action.type) {
    case ActionTypes.CHANGE_STREAM_PROPERTIES:
      return {
        authKey: state.authKey,
        ban: state.ban,
        stream: action.payload,
      };
    case ActionTypes.CHANGE_BAN_STATUS:
      return {
        authKey: state.authKey,
        ban: action.payload,
        stream: state.stream,
      };
    case ActionTypes.LOAD_AUTH_KEY:
      return {
        authKey: action.payload,
        ban: state.ban,
        stream: state.stream,
      };
    case ActionTypes.SEND_TELEMETRY_DATA:
      return state;
    default:
      return state;
  }
};

export default giveawayPageReducer;
