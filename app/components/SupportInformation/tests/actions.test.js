import { CHANGE_DIALOG_VISIBILITY } from '../constants';

import { changeDialogVisibility } from '../actions';

describe('SupportInformation Actions', () => {
  describe('changeDialogVisibility', () => {
    it('should return the correct type and the passed bool', () => {
      const fixture = true;
      const expectedResult = {
        type: CHANGE_DIALOG_VISIBILITY,
        isOpen: true,
      };

      expect(changeDialogVisibility(fixture)).toEqual(expectedResult);
    });
  });
});
