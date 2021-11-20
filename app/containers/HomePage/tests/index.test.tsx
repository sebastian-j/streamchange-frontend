import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import HomePage from '../index';

const mockStore = configureStore([]);

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = mockStore({
      ownerId: 'id',
      title: 'title',
      videoId: 'vid',
    });
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <HomePage />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
