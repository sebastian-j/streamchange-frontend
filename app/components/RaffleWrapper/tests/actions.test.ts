import {
  CHANGE_ANIMATION,
  CHANGE_DURATION,
  CHANGE_VISIBILITY,
} from '../constants';
import {
  changeAnimation,
  changeAnimationDuration,
  changeVisibility,
} from '../actions';

describe('RaffleWrapper Actions', () => {
  describe('changeAnimation', () => {
    it('should return the correct type and the passed int', () => {
      const fixture = 1;
      const expectedResult = {
        type: CHANGE_ANIMATION,
        animationType: fixture,
      };

      expect(changeAnimation(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeAnimationDuration', () => {
    it('should return the correct type and the passed int', () => {
      const fixture = 15;
      const expectedResult = {
        type: CHANGE_DURATION,
        animationDuration: fixture,
      };

      expect(changeAnimationDuration(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeVisibility', () => {
    it('should return the correct type and the passed bool', () => {
      const fixture = false;
      const expectedResult = {
        type: CHANGE_VISIBILITY,
        isOpen: fixture,
      };

      expect(changeVisibility(fixture)).toEqual(expectedResult);
    });
  });
});
