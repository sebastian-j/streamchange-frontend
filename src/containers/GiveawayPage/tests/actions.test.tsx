import { action } from 'typesafe-actions';
import { describe, expect, it } from 'vitest';

import { changeStreamProperties } from '../actions';
import ActionTypes from '../constants';

describe('GiveawayPage Actions', () => {
  describe('changeOwnerId', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = {
        ownerId: 'id',
        title: 'stream',
        videoId: 'vid',
      };
      const expectedResult = action(
        ActionTypes.CHANGE_STREAM_PROPERTIES,
        fixture
      );

      expect(changeStreamProperties(fixture)).toEqual(expectedResult);
    });
  });
});
