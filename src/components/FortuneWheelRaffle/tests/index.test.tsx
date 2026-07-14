import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it } from 'vitest';

import FortuneWheelRaffle from '../index';

const mockStore = configureStore([]);

describe('<FortuneWheelRaffle />', () => {
  let store: ReturnType<typeof mockStore>;
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
