import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import YoutubeWorker from '../index';

const mockStore = configureStore([]);

describe('<YoutubeWorker />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      isOpen: false,
    });
  });
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <YoutubeWorker
            apiKey="key"
            channelId="id"
            liveChatId="chatId"
            videoId="vidId"
          />
        </Provider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
