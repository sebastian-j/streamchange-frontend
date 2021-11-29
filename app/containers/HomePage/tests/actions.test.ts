import { action } from 'typesafe-actions';
import ActionTypes from '../constants';

import {
  changeOwnerId,
  changeThumbnailUrl,
  changeVideoId,
  changeTitle,
} from '../actions';

describe('HomePage Actions', () => {
  describe('changeOwnerId', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = 'id';
      const expectedResult = action(ActionTypes.CHANGE_OWNER_ID, fixture);

      expect(changeOwnerId(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeThumbnailUrl', () => {
    it('should return the correct type and the passed url', () => {
      const fixture = 'https://www.streamchange.pl';
      const expectedResult = action(ActionTypes.CHANGE_THUMBNAIL_URL, fixture);

      expect(changeThumbnailUrl(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeTitle', () => {
    it('should return the correct type and the passed title', () => {
      const fixture = 'video title';
      const expectedResult = action(ActionTypes.CHANGE_TITLE, fixture);

      expect(changeTitle(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeVideoId', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = 'example video id';
      const expectedResult = action(ActionTypes.CHANGE_VIDEO_ID, fixture);

      expect(changeVideoId(fixture)).toEqual(expectedResult);
    });
  });
});
