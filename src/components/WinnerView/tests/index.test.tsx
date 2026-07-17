import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it } from 'vitest';

import WinnerView from '../index';

const mockStore = configureStore([]);

describe('<WinnerView />', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      isOpen: false,
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={{}}>
        <Provider store={store}>
          <WinnerView apiKey="key" id="id" onClose={() => 0} />
        </Provider>
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
