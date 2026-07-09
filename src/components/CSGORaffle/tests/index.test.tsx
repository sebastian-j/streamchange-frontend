import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import CSGORaffle from '../index';

const mockStore = configureStore([]);

describe('<CSGORaffle />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      preWinner: { id: 'id' },
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <CSGORaffle onClose={() => 0} onWin={() => 0} />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
