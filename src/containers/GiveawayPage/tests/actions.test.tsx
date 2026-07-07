import { action } from 'typesafe-actions';
import ActionTypes from '../constants';

import {
  changeStreamProperties
} from '../actions';

describe('GiveawayPage Actions', () => {
  describe('changeOwnerId', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = {ownerId: 'id', thumbnailUrl: 'url', title: 'stream', videoId: 'vid'};
      const expectedResult = action(ActionTypes.CHANGE_STREAM_PROPERTIES, fixture);

      expect(changeStreamProperties(fixture)).toEqual(expectedResult);
    });
  });
});
