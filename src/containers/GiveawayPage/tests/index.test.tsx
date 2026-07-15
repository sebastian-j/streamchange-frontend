import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { beforeAll, describe, expect, it } from 'vitest';

import configureStore from '../../../configureStore';
import GiveawayPage from '../index';

describe('<GiveawayPage />', () => {
  let store: ReturnType<typeof configureStore>;
  beforeAll(() => {
    store = configureStore({
      authKey: '',
      ban: null,
      stream: {
        ownerId: '',
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
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
