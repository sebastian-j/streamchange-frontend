import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { beforeEach, describe, expect, it } from 'vitest';

import QueueColumn from '../QueueColumn';

type QueueItem = {
  id: string;
  title: string;
};

type RootState = {
  queueArray: QueueItem[];
};

const mockStore = configureStore<RootState>([]);

describe('<QueueColumn />', () => {
  let store: MockStoreEnhanced<RootState, {}>;
  beforeEach(() => {
    store = mockStore({
      queueArray: [
        { id: 'id', title: 'item1' },
        { id: 'id2', title: 'item2' },
      ],
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={{}}>
        <Provider store={store}>
          <QueueColumn />
        </Provider>
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
