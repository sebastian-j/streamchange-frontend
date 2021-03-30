import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import QueueColumn from '../QueueColumn';

const renderer = new ShallowRenderer();
const mockStore = configureStore([]);

describe('<QueueColumn />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      queueArray: [{ id: 'id', title: 'item1' }, { id: 'id2', title: 'item2' }],
    });
  });
  it('should render and match the snapshot', () => {
    renderer.render(
      <Provider store={store}>
        <QueueColumn />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
