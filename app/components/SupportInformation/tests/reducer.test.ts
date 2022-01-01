import supportInfoReducer, { initialState } from '../reducer';
import { changeDialogVisibility } from '../actions';

describe('supportInfoReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      isOpen: false,
    };
  });

  it('should return the initial state', () => {
    expect(supportInfoReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle the changeDialogVisibility action correctly', () => {
    const fixture = true;
    const expectedResult = { isOpen: fixture };

    expect(supportInfoReducer(state, changeDialogVisibility(fixture))).toEqual(
      expectedResult,
    );
  });
});
