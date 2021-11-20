import { CHANGE_KEYWORD, CHANGE_PREWINNER, CHANGE_PRIZE } from '../constants';

import { changeKeyword, changePreWinner, changePrize } from '../actions';

describe('GiveawayRules Actions', () => {
  describe('changeKeyword', () => {
    it('should return the correct type and the passed keyword', () => {
      const fixture = 'join';
      const expectedResult = {
        type: CHANGE_KEYWORD,
        keyword: fixture,
      };

      expect(changeKeyword(fixture)).toEqual(expectedResult);
    });
  });
  describe('changePreWinner', () => {
    it('should return the correct type and the passed preWinner', () => {
      const fixture = { id: 'id' };
      const expectedResult = {
        type: CHANGE_PREWINNER,
        preWinner: fixture,
      };

      expect(changePreWinner(fixture)).toEqual(expectedResult);
    });
  });
  describe('changePrize', () => {
    it('should return the correct type and the passed string', () => {
      const fixture = 'trophy';
      const expectedResult = {
        type: CHANGE_PRIZE,
        prize: fixture,
      };

      expect(changePrize(fixture)).toEqual(expectedResult);
    });
  });
});
