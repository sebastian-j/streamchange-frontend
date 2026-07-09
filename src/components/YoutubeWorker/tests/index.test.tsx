import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import YoutubeWorker from '../index';
import { API_URL } from '../../../config';

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
    const { container } = render(
      <Provider store={store}>
        <YoutubeWorker apiKey="key" channel="vidId" />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('API_URL', () => {
  it('should contain "api"', () => {
    const isCorrect = API_URL.includes('api');
    expect(isCorrect).toEqual(true);
  });
});
