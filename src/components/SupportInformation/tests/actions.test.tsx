import { action } from 'typesafe-actions';
import { describe, it, expect } from 'vitest';

import ActionTypes from '../constants';
import { changeDialogVisibility } from '../actions';

describe('SupportInformation Actions', () => {
  describe('changeDialogVisibility', () => {
    it('should return the correct type and the passed bool', () => {
      const fixture = true;
      const expectedResult = action(
        ActionTypes.CHANGE_DIALOG_VISIBILITY,
        fixture
      );

      expect(changeDialogVisibility(fixture)).toEqual(expectedResult);
    });
  });
});
