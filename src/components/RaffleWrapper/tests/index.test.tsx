import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import RaffleWrapper from '../index';

const mockStore = configureStore([]);

describe('<RaffleWrapper />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      isOpen: false,
    });
  });
  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale="en">
            <RaffleWrapper onWin={() => 0} />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
