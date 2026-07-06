import { action } from 'typesafe-actions';
import ActionTypes from '../constants';

import { changeColor, toggleDarkMode } from '../actions';

describe('StyleProvider Actions', () => {
  describe('changeColor', () => {
    it('should return the correct type and the passed color', () => {
      const fixture = '#fffbdd';
      const expectedResult = action(ActionTypes.CHANGE_COLOR, fixture);

      expect(changeColor(fixture)).toEqual(expectedResult);
    });
  });
  describe('toggleDarkMode', () => {
    it('should return the correct type and the passed bool', () => {
      const fixture = true;
      const expectedResult = action(ActionTypes.TOGGLE_DARK_MODE, fixture);

      expect(toggleDarkMode(fixture)).toEqual(expectedResult);
    });
  });
});
