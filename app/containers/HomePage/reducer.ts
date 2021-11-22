/*
 *
 * HomePage reducer
 *
 */
import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  ownerId: '',
  thumbnailUrl: '',
  title: '',
  videoId: '',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState => {
  switch (action.type) {
    case ActionTypes.CHANGE_OWNER_ID:
      return {
        ownerId: action.payload,
        thumbnailUrl: state.thumbnailUrl,
        title: state.title,
        videoId: state.videoId,
      };
    case ActionTypes.CHANGE_THUMBNAIL_URL:
      return {
        ownerId: state.ownerId,
        thumbnailUrl: action.payload,
        title: state.title,
        videoId: state.videoId,
      };
    case ActionTypes.CHANGE_TITLE:
      return {
        ownerId: state.ownerId,
        thumbnailUrl: state.thumbnailUrl,
        title: action.payload,
        videoId: state.videoId,
      };
    case ActionTypes.CHANGE_VIDEO_ID:
      return {
        ownerId: state.ownerId,
        thumbnailUrl: state.thumbnailUrl,
        title: state.title,
        videoId: action.payload,
      };
    default:
      return state;
  }
};

export default homePageReducer;
