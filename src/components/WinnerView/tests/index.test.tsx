import React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import WinnerView from '../index';

const shallowRenderer = createRenderer();
const mockStore = configureStore([]);

describe('<WinnerView />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      isOpen: false,
    });
  });
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <WinnerView apiKey="key" id="id" onClose={() => 0} />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
