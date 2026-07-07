import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import SettingsDialog from '../index';

const shallowRenderer = createRenderer();
const mockStore = configureStore([]);

describe('<SettingsDialog />', () => {
  let store;

  beforeAll(() => {
    store = mockStore({
      themeColor: '#ffffff',
    });
  });

  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <SettingsDialog />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
