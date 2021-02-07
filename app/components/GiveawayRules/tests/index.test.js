import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import GiveawayRules from '../index';

const renderer = new ShallowRenderer();
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
    renderer.render(
      <Provider store={store}>
        <GiveawayRules apiKey="key" channelId="id" />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
