import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_URL } from '../../../config';
import YoutubeWorker from '../index';

const mockStore = configureStore([]);

const { axiosGetMock } = vi.hoisted(() => ({
  axiosGetMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    get: axiosGetMock,
  },
}));

vi.mock('../../ChatView', () => ({
  default: () => <div data-testid="chat-view" />,
}));

vi.mock('../../GiveawayRules', () => ({
  default: () => <div data-testid="giveaway-rules" />,
}));

vi.mock('../../UserList', () => ({
  default: () => <div data-testid="user-list" />,
}));

vi.mock('../SuperChat', () => ({
  default: () => <div data-testid="super-chat" />,
}));

vi.mock('../../AdFrame', () => ({
  default: () => <div data-testid="ad-frame" />,
}));

describe('<YoutubeWorker />', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      isOpen: false,
      userArray: [],
    });
  });
  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <YoutubeWorker apiKey="key" channel="vidId" />
        </IntlProvider>
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
