import produce from 'immer';

import giveawayPageReducer, { initialState } from '../reducer';
import { changeStreamProperties } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('giveawayPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      authKey: '',
      ban: null,
      stream: {
        ownerId: '',
        thumbnailUrl: '',
        title: '',
        videoId: '',
      },
    };
  });

  it('should return the initial state', () => {
    expect(giveawayPageReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle the changeOwnerId action correctly', () => {
    const fixture = {ownerId: 'id', thumbnailUrl: 'url', title: 'stream', videoId: 'vid'};
    const expectedResult = produce(state, (draft) => {
      draft.stream = fixture;
    });

    expect(giveawayPageReducer(state, changeStreamProperties(fixture))).toEqual(
      expectedResult,
    );
  });
});
