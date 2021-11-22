/*
 *
 * HomePage actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const changeOwnerId = (ownerId: string) =>
  action(ActionTypes.CHANGE_OWNER_ID, ownerId);

export const changeThumbnailUrl = (thumbnailUrl: string) =>
  action(ActionTypes.CHANGE_THUMBNAIL_URL, thumbnailUrl);

export const changeTitle = (title: string) =>
  action(ActionTypes.CHANGE_TITLE, title);

export const changeVideoId = (videoId: string) =>
  action(ActionTypes.CHANGE_VIDEO_ID, videoId);
