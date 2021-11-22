import {
  selectRules,
  makeSelectGiveawayKeyword,
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayPrize,
} from '../selectors';
import { initialState } from '../reducer';

describe('GiveawayRules selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState: any = {
      giveawayRules: globalState,
    };
    expect(selectRules(mockedState)).toEqual(globalState);
  });

  it('should select the GiveawayRules initial state', () => {
    const mockedState: any = {};
    expect(selectRules(mockedState)).toEqual(initialState);
  });

  it('should select the keyword', () => {
    const keywordSelector = makeSelectGiveawayKeyword();
    const keyword = 'join';
    const mockedState: any = {
      giveawayRules: {
        keyword,
      },
    };
    expect(keywordSelector(mockedState)).toEqual(keyword);
  });

  it('should select preWinner', () => {
    const winnerSelector = makeSelectGiveawayPreWinner();
    const preWinner = { id: 'id' };
    const mockedState: any = {
      giveawayRules: {
        preWinner,
      },
    };
    expect(winnerSelector(mockedState)).toEqual(preWinner);
  });

  it('should select the prize', () => {
    const prizeSelector = makeSelectGiveawayPrize();
    const prize = 'trophy';
    const mockedState: any = {
      giveawayRules: {
        prize,
      },
    };
    expect(prizeSelector(mockedState)).toEqual(prize);
  });
});
