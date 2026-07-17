import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeAll, describe, expect, it } from 'vitest';

import SettingsDialog from '../index';

const mockStore = configureStore([]);

describe('<SettingsDialog />', () => {
  let store: ReturnType<typeof mockStore>;

  beforeAll(() => {
    store = mockStore({
      themeColor: '#ffffff',
    });
  });

  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SettingsDialog />
        </IntlProvider>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
