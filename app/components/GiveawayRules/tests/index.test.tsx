import React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import GiveawayRules from '../index';

const shallowRenderer = createRenderer();
const mockStore = configureStore([]);

describe('<GiveawayRules />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      keyword: 'Keyword',
      prize: 'Prize',
    });
  });
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <GiveawayRules apiKey="key" />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
