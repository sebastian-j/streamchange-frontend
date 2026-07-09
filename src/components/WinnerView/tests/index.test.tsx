import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import WinnerView from '../index';

const mockStore = configureStore([]);

describe('<WinnerView />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      isOpen: false,
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <WinnerView apiKey="key" id="id" onClose={() => 0} />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
