import React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import SubStatus from '../SubStatus';

const shallowRenderer = createRenderer();
const mockStore = configureStore([]);

describe('<SubStatus />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      ownerId: 'id',
    });
  });
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <SubStatus apiKey="key" id="id" ownerId="owner" />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
