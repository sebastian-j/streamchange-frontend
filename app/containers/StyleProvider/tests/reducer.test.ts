import produce from 'immer';

import styleProviderReducer from '../reducer';
import { changeColor, toggleDarkMode } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('styleProviderReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      color: '#0094ff',
      isDarkMode: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(styleProviderReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the changeColor action correctly', () => {
    const fixture = '#fffbdd';
    const expectedResult = produce(state, (draft) => {
      draft.color = fixture;
    });

    expect(styleProviderReducer(state, changeColor(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the toggleDarkMode action correctly', () => {
    const fixture = true;
    const expectedResult = produce(state, (draft) => {
      draft.isDarkMode = fixture;
    });

    expect(styleProviderReducer(state, toggleDarkMode(fixture))).toEqual(
      expectedResult,
    );
  });
});
