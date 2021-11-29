import { action } from 'typesafe-actions';
import ActionTypes from '../constants';
import {
  changeAnimation,
  changeAnimationDuration,
  changeVisibility,
} from '../actions';


describe('RaffleWrapper Actions', () => {
  describe('changeAnimation', () => {
    it('should return the correct type and the passed int', () => {
      const fixture = 1;
      const expectedResult = action(ActionTypes.CHANGE_ANIMATION, fixture);

      expect(changeAnimation(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeAnimationDuration', () => {
    it('should return the correct type and the passed int', () => {
      const fixture = 15;
      const expectedResult = action(ActionTypes.CHANGE_DURATION, fixture);

      expect(changeAnimationDuration(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeVisibility', () => {
    it('should return the correct type and the passed bool', () => {
      const fixture = false;
      const expectedResult = action(ActionTypes.CHANGE_VISIBILITY, fixture);

      expect(changeVisibility(fixture)).toEqual(expectedResult);
    });
  });
});
