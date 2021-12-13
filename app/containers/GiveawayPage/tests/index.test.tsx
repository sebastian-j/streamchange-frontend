import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import GiveawayPage from '../index';
import configureStore from '../../../configureStore';


describe('<GiveawayPage />', () => {
  let store;
  beforeAll(() => {
    store = configureStore({
      authKey: '',
      ban: null,
      stream: {
        ownerId: '',
        thumbnailUrl: '',
        title: '',
        videoId: '',
      },
    });
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <GiveawayPage />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
