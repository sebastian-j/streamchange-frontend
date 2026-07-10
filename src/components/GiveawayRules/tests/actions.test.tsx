import { action } from 'typesafe-actions';
import { describe, expect, it } from 'vitest';

import { changeKeyword, changePreWinner, changePrize } from '../actions';
import ActionTypes from '../constants';

describe('GiveawayRules Actions', () => {
  describe('changeKeyword', () => {
    it('should return the correct type and the passed keyword', () => {
      const fixture: string = 'join';
      const expectedResult = action(ActionTypes.CHANGE_KEYWORD, fixture);

      expect(changeKeyword(fixture)).toEqual(expectedResult);
    });
  });
  describe('changePreWinner', () => {
    it('should return the correct type and the passed preWinner', () => {
      const fixture = {
        id: 'id2',
        imageUrl: 'url',
        badges: ['moderator'],
        isEligible: true,
        isModerator: true,
        isSubscriber: false,
        isVerified: false,
        isVip: false,
        message: 'test',
        title: 'user',
      };
      const expectedResult = action(ActionTypes.CHANGE_PREWINNER, fixture);

      expect(changePreWinner(fixture)).toEqual(expectedResult);
    });
  });
  describe('changePrize', () => {
    it('should return the correct type and the passed string', () => {
      const fixture: string = 'trophy';
      const expectedResult = action(ActionTypes.CHANGE_PRIZE, fixture);

      expect(changePrize(fixture)).toEqual(expectedResult);
    });
  });
});
