import {
  selectRules,
  makeSelectGiveawayKeyword,
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayPrize,
} from '../selectors';
import { initialState } from '../reducer';

describe('QueuePage selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      giveawayRules: globalState,
    };
    expect(selectRules(mockedState)).toEqual(globalState);
  });

  it('should select the QueuePage initial state', () => {
    const mockedState = {};
    expect(selectRules(mockedState)).toEqual(initialState);
  });

  it('should select the keyword', () => {
    const keywordSelector = makeSelectGiveawayKeyword();
    const keyword = 'join';
    const mockedState = {
      giveawayRules: {
        keyword,
      },
    };
    expect(keywordSelector(mockedState)).toEqual(keyword);
  });

  it('should select preWinner', () => {
    const winnerSelector = makeSelectGiveawayPreWinner();
    const preWinner = { id: 'id' };
    const mockedState = {
      giveawayRules: {
        preWinner,
      },
    };
    expect(winnerSelector(mockedState)).toEqual(preWinner);
  });

  it('should select the prize', () => {
    const prizeSelector = makeSelectGiveawayPrize();
    const prize = 'trophy';
    const mockedState = {
      giveawayRules: {
        prize,
      },
    };
    expect(prizeSelector(mockedState)).toEqual(prize);
  });
});
