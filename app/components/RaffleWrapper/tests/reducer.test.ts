import produce from 'immer';

import raffleWrapperReducer, { initialState } from '../reducer';
import {
  changeAnimation,
  changeAnimationDuration,
  changeVisibility,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('rafleWrapperReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      animationType: 0,
      animationDuration: 7,
      isOpen: false,
    };
  });

  it('should return the initial state', () => {
    expect(raffleWrapperReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle the changeAnimation action correctly', () => {
    const fixture = 1;
    const expectedResult = produce(state, (draft) => {
      draft.animationType = fixture;
    });

    expect(raffleWrapperReducer(state, changeAnimation(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeAnimationDuration action correctly', () => {
    const fixture = 16;
    const expectedResult = produce(state, (draft) => {
      draft.animationDuration = fixture;
    });

    expect(
      raffleWrapperReducer(state, changeAnimationDuration(fixture)),
    ).toEqual(expectedResult);
  });

  it('should handle the changeVisibility action correctly', () => {
    const fixture = true;
    const expectedResult = produce(state, (draft) => {
      draft.isOpen = fixture;
    });

    expect(raffleWrapperReducer(state, changeVisibility(fixture))).toEqual(
      expectedResult,
    );
  });
});
