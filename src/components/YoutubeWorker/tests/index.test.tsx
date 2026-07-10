import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it } from 'vitest';

import { API_URL } from '../../../config';
import YoutubeWorker from '../index';

const mockStore = configureStore([]);

describe('<YoutubeWorker />', () => {
  let store: ReturnType<typeof mockStore>;
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
