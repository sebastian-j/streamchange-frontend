import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
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
        <IntlProvider locale="en" messages={{}}>
          <SettingsDialog />
        </IntlProvider>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
