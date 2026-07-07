import React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import YoutubeWorker from '../index';
import { API_URL } from '../../../config';

const shallowRenderer = createRenderer();
const mockStore = configureStore([]);

describe('<YoutubeWorker />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      isOpen: false,
      userArray: [],
    });
  });
  it('should match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <YoutubeWorker apiKey="key" videoId="vidId" />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});

describe('API_URL', () => {
  it('should contain "api"', () => {
    const isCorrect = API_URL.includes('api');
    expect(isCorrect).toEqual(true);
  });
});
