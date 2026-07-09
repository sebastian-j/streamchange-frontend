import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeAll } from 'vitest';

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
        <SettingsDialog />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
