import { Draft, produce } from 'immer';
import { beforeEach, describe, expect, it } from 'vitest';

import { changeStreamProperties } from '../actions';
import giveawayPageReducer, { initialState } from '../reducer';

type GiveawayPageState = typeof initialState;
type StreamProperties = GiveawayPageState['stream'];
type GiveawayPageAction = Parameters<typeof giveawayPageReducer>[1];

describe('giveawayPageReducer', () => {
  let state: GiveawayPageState;
  beforeEach(() => {
    state = {
      stream: {
        ownerId: '',
        title: '',
        videoId: '',
      },
    };
  });

  it('should return the initial state', () => {
    expect(giveawayPageReducer(undefined, {} as GiveawayPageAction)).toEqual(
      initialState
    );
  });

  it('should handle the changeOwnerId action correctly', () => {
    const fixture: StreamProperties = {
      ownerId: 'id',
      title: 'stream',
      videoId: 'vid',
    };
    const expectedResult = produce(state, (draft: Draft<GiveawayPageState>) => {
      draft.stream = fixture;
    });

    expect(giveawayPageReducer(state, changeStreamProperties(fixture))).toEqual(
      expectedResult
    );
  });
});
