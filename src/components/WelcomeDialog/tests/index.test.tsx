import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import WelcomeDialog from '../index';
import configureStore from '../../../configureStore';

describe('<WelcomeDialog />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <WelcomeDialog passVideo={() => 0} />
        </IntlProvider>
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
