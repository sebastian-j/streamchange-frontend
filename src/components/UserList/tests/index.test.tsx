import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import UserList from '../index';

const databaseMock = vi.hoisted(() => ({
  table: vi.fn(),
}));

vi.mock('../../StreamerWorker/db', () => ({
  default: databaseMock,
}));

vi.mock('../../../utils/injectReducer', () => ({
  useInjectReducer: vi.fn(),
}));

const mockStore = configureStore([]);

describe('<UserList />', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    databaseMock.table.mockReturnValue({
      toArray: vi.fn().mockResolvedValue([]),
    });
    store = mockStore({
      userArray: [
        {
          id: 'id1',
          title: 'Alice',
          color: '#ffffff',
          platform: 'twitch',
          badges: [],
          isEligible: true,
          isModerator: false,
          isSubscriber: true,
          isVip: false,
          isStreamer: false,
        },
        {
          id: 'id2',
          title: 'Bob',
          color: '#000000',
          platform: 'twitch',
          badges: [],
          isEligible: false,
          isModerator: true,
          isSubscriber: false,
          isVip: false,
          isStreamer: false,
        },
      ],
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <UserList />
        </IntlProvider>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
