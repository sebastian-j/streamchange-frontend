import {
  CHANGE_OWNER_ID,
  CHANGE_THUMBNAIL_URL,
  CHANGE_TITLE,
  CHANGE_VIDEO_ID,
} from '../constants';

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
      const expectedResult = {
        type: CHANGE_OWNER_ID,
        ownerId: fixture,
      };

      expect(changeOwnerId(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeThumbnailUrl', () => {
    it('should return the correct type and the passed url', () => {
      const fixture = 'https://www.streamchange.pl';
      const expectedResult = {
        type: CHANGE_THUMBNAIL_URL,
        thumbnailUrl: fixture,
      };

      expect(changeThumbnailUrl(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeTitle', () => {
    it('should return the correct type and the passed title', () => {
      const fixture = 'video title';
      const expectedResult = {
        type: CHANGE_TITLE,
        title: fixture,
      };

      expect(changeTitle(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeVideoId', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = 'example video id';
      const expectedResult = {
        type: CHANGE_VIDEO_ID,
        videoId: fixture,
      };

      expect(changeVideoId(fixture)).toEqual(expectedResult);
    });
  });
});
