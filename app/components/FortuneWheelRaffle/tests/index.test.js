import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import FortuneWheelRaffle from '../index';

const renderer = new ShallowRenderer();
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
    renderer.render(
      <Provider store={store}>
        <FortuneWheelRaffle onClose={() => 0} onWin={() => 0} />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
