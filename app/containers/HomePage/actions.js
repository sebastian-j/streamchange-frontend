/*
 *
 * HomePage actions
 *
 */

import {
  CHANGE_OWNER_ID,
  CHANGE_THUMBNAIL_URL,
  CHANGE_TITLE,
  CHANGE_VIDEO_ID,
} from './constants';

export function changeOwnerId(id) {
  return {
    type: CHANGE_OWNER_ID,
    ownerId: id,
  };
}

export function changeThumbnailUrl(url) {
  return {
    type: CHANGE_THUMBNAIL_URL,
    thumbnailUrl: url,
  };
}

export function changeTitle(t) {
  return {
    type: CHANGE_TITLE,
    title: t,
  };
}

export function changeVideoId(id) {
  return {
    type: CHANGE_VIDEO_ID,
    videoId: id,
  };
}
