import { action } from 'typesafe-actions';
import { describe, expect, it } from 'vitest';

import { changeDialogVisibility } from '../actions';
import ActionTypes from '../constants';

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
