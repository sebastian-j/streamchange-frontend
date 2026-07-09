import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import QueueColumn from '../QueueColumn';

const mockStore = configureStore([]);

describe('<QueueColumn />', () => {
  let store;
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
      <Provider store={store}>
        <QueueColumn />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
