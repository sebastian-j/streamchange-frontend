import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import RaffleWrapper from '../index';

const mockStore = configureStore([]);

describe('<RaffleWrapper />', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      isOpen: false,
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
        <Provider store={store}>
          <IntlProvider locale="en">
            <RaffleWrapper onWin={() => 0} />
          </IntlProvider>
        </Provider>
      )
    expect(container.firstChild).toMatchSnapshot();
  });
});
