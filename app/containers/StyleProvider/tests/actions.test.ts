import { CHANGE_COLOR, TOGGLE_DARK_MODE } from '../constants';

import { changeColor, toggleDarkMode } from '../actions';

describe('StyleProvider Actions', () => {
  describe('changeColor', () => {
    it('should return the correct type and the passed color', () => {
      const fixture = '#fffbdd';
      const expectedResult = {
        type: CHANGE_COLOR,
        color: fixture,
      };

      expect(changeColor(fixture)).toEqual(expectedResult);
    });
  });
  describe('toggleDarkMode', () => {
    it('should return the correct type and the passed bool', () => {
      const fixture = true;
      const expectedResult = {
        type: TOGGLE_DARK_MODE,
        isDarkMode: fixture,
      };

      expect(toggleDarkMode(fixture)).toEqual(expectedResult);
    });
  });
});
