import { Draft, produce } from 'immer';
import { beforeEach, describe, expect, it } from 'vitest';

import { changeColor, toggleDarkMode } from '../actions';
import styleProviderReducer from '../reducer';

interface StyleProviderState {
  color: string;
  isDarkMode: boolean;
}

const initialState: StyleProviderState = {
  color: '#0094ff',
  isDarkMode: false,
};

describe('styleProviderReducer', () => {
  let state: StyleProviderState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return the initial state', () => {
    expect(styleProviderReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle the changeColor action correctly', () => {
    const fixture = '#fffbdd';
    const expectedResult = produce(
      initialState,
      (draft: Draft<StyleProviderState>) => {
        draft.color = fixture;
      }
    );

    expect(styleProviderReducer(state, changeColor(fixture))).toEqual(
      expectedResult
    );
  });

  it('should handle the toggleDarkMode action correctly', () => {
    const fixture = true;
    const expectedResult = produce(
      initialState,
      (draft: Draft<StyleProviderState>) => {
        draft.isDarkMode = fixture;
      }
    );

    expect(styleProviderReducer(state, toggleDarkMode(fixture))).toEqual(
      expectedResult
    );
  });
});
