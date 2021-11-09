import produce from 'immer';

import supportInfoReducer, { initialState } from '../reducer';
import { changeDialogVisibility } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('supportInfoReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      isOpen: false,
    };
  });

  it('should return the initial state', () => {
    expect(supportInfoReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the changeDialogVisibility action correctly', () => {
    const fixture = true;
    const expectedResult = produce(state, (draft) => {
      draft.isOpen = fixture;
    });

    expect(supportInfoReducer(state, changeDialogVisibility(fixture))).toEqual(
      expectedResult,
    );
  });
});
