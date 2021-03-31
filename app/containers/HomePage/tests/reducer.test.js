import produce from 'immer';

import homePageReducer, { initialState } from '../reducer';
import { changeOwnerId } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('homePageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      ownerId: '',
      thumbnailUrl: '',
      title: '',
      videoId: '',
    };
  });

  it('should return the initial state', () => {
    expect(homePageReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the changeOwnerId action correctly', () => {
    const fixture = 'id';
    const expectedResult = produce(state, (draft) => {
      draft.ownerId = fixture;
    });

    expect(homePageReducer(state, changeOwnerId(fixture))).toEqual(
      expectedResult,
    );
  });
});
