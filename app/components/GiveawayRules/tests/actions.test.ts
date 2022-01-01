import { action } from 'typesafe-actions';
import ActionTypes from '../constants';

import { changeKeyword, changePreWinner, changePrize } from '../actions';

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
        isEligible: true,
        isModerator: false,
        isSponsor: false,
        isVerified: false,
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
