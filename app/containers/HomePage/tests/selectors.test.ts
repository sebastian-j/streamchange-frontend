import {
  selectHomePage,
  makeSelectOwnerId,
  makeSelectVideoId,
  makeSelectThumbnailUrl,
  makeSelectTitle,
} from '../selectors';
import { initialState } from '../reducer';

describe('HomePage selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      streamInfo: globalState,
    };
    expect(selectHomePage(mockedState)).toEqual(globalState);
  });

  it('should select the HomePage initial state', () => {
    const mockedState = {};
    expect(selectHomePage(mockedState)).toEqual(initialState);
  });

  it('should select ownerId', () => {
    const idSelector = makeSelectOwnerId();
    const ownerId = 'some text';
    const mockedState = {
      streamInfo: {
        ownerId,
      },
    };
    expect(idSelector(mockedState)).toEqual(ownerId);
  });

  it('should select videoId', () => {
    const idSelector = makeSelectVideoId();
    const videoId = 'some text';
    const mockedState = {
      streamInfo: {
        videoId,
      },
    };
    expect(idSelector(mockedState)).toEqual(videoId);
  });

  it('should select thumbnailUrl', () => {
    const urlSelector = makeSelectThumbnailUrl();
    const thumbnailUrl = 'some text';
    const mockedState = {
      streamInfo: {
        thumbnailUrl,
      },
    };
    expect(urlSelector(mockedState)).toEqual(thumbnailUrl);
  });

  it('should select title', () => {
    const titleSelector = makeSelectTitle();
    const title = 'some text';
    const mockedState = {
      streamInfo: {
        title,
      },
    };
    expect(titleSelector(mockedState)).toEqual(title);
  });
});
