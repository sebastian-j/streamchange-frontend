import produce from 'immer';

import giveawayRulesReducer, { initialState } from '../reducer';
import { changeKeyword, changePreWinner, changePrize } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('giveawayRulesReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      keyword: 'join',
      preWinner: { id: 'id' },
      prize: 'trophy',
    };
  });

  it('should return the initial state', () => {
    expect(giveawayRulesReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle the changeKeyword action correctly', () => {
    const fixture = 'join the raffle';
    const expectedResult = produce(state, (draft) => {
      draft.keyword = fixture;
    });

    expect(giveawayRulesReducer(state, changeKeyword(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changePreWinner action correctly', () => {
    const fixture = {
      id: 'id2',
      imageUrl: 'url',
      isEligible: true,
      isModerator: false,
      isSponsor: false,
      message: 'test',
      title: 'user',
    };
    const expectedResult = produce(state, (draft) => {
      draft.preWinner = fixture;
    });

    expect(giveawayRulesReducer(state, changePreWinner(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changePrize action correctly', () => {
    const fixture = 'cash';
    const expectedResult = produce(state, (draft) => {
      draft.prize = fixture;
    });

    expect(giveawayRulesReducer(state, changePrize(fixture))).toEqual(
      expectedResult,
    );
  });
});
