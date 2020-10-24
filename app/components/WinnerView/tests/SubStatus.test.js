import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import SubStatus from '../SubStatus';

const renderer = new ShallowRenderer();
const mockStore = configureStore([]);

describe('<SubStatus />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      ownerId: 'id',
    });
  });
  it('should render and match the snapshot', () => {
    renderer.render(
      <Provider store={store}>
        <SubStatus apiKey="key" id="id" ownerId="owner" />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
