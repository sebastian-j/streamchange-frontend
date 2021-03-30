import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import CSGORaffle from '../index';

const renderer = new ShallowRenderer();
const mockStore = configureStore([]);

describe('<CSGORaffle />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      preWinner: { id: 'id' },
    });
  });
  it('should render and match the snapshot', () => {
    renderer.render(
      <Provider store={store}>
        <CSGORaffle onClose={() => 0} onWin={() => 0} />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
