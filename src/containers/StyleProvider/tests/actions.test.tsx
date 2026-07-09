import { action } from 'typesafe-actions';
import { describe, expect, it } from 'vitest';

import { changeColor, toggleDarkMode } from '../actions';
import ActionTypes from '../constants';

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
