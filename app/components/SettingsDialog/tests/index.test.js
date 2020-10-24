import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import SettingsDialog from '../index';
import configureStore from '../../../configureStore';

const renderer = new ShallowRenderer();

describe('<SettingsDialog />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    renderer.render(
      <Provider store={store}>
        <SettingsDialog />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
