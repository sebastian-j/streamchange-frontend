import { selectGiveawayPage, makeSelectStreamInfo } from '../selectors';
import { initialState } from '../reducer';

describe('GiveawayPage selectors', () => {
  it('should select the global state', () => {
    const globalState = {
      authKey: '',
      ban: null,
      stream: {
        ownerId: '',
        thumbnailUrl: '',
        title: '',
        videoId: '',
      },
    };
    const mockedState: any = {
      streamInfo: globalState,
    };
    expect(selectGiveawayPage(mockedState)).toEqual(globalState);
  });

  it('should select the HomePage initial state', () => {
    const mockedState: any = {};
    expect(selectGiveawayPage(mockedState)).toEqual(initialState);
  });

  it('should select stream properties', () => {
    const infoSelector = makeSelectStreamInfo();
    const stream = {
      ownerId: '',
      thumbnailUrl: '',
      title: '',
      videoId: '',
    };
    const mockedState: any = {
      streamInfo: {
        stream,
      },
    };
    expect(infoSelector(mockedState)).toEqual(stream);
  });
});
