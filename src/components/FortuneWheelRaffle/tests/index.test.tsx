import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import FortuneWheelRaffle from '../index';

const mockStore = configureStore([]);

describe('<FortuneWheelRaffle />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      requirement: 0,
      userArray: [
        { id: 'id1', title: 'user1' },
        { id: 'id2', title: 'user2' },
      ],
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <FortuneWheelRaffle onClose={() => 0} onWin={() => 0} />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
