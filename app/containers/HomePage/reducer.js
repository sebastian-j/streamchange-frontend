/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';

import {
  CHANGE_OWNER_ID,
  CHANGE_THUMBNAIL_URL,
  CHANGE_TITLE,
  CHANGE_VIDEO_ID,
} from './constants';

export const initialState = {
  ownerId: '',
  thumbnailUrl: '',
  title: '',
  videoId: '',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_OWNER_ID:
        draft.ownerId = action.ownerId;
        break;
      case CHANGE_THUMBNAIL_URL:
        draft.thumbnailUrl = action.thumbnailUrl;
        break;
      case CHANGE_TITLE:
        draft.title = action.title;
        break;
      case CHANGE_VIDEO_ID:
        draft.videoId = action.videoId;
        break;
    }
  });

export default homePageReducer;
