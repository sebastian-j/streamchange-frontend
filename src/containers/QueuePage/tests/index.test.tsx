import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { beforeAll, describe, expect, it } from 'vitest';

import configureStore from '../../../configureStore';
import QueuePage from '../index';

describe('<QueuePage />', () => {
  let store: ReturnType<typeof configureStore>;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <QueuePage />
        </IntlProvider>
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
