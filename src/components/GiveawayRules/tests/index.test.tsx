import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import GiveawayRules from '../index';

const mockStore = configureStore([]);

vi.mock('../../AdFrame', () => ({
  default: () => <div data-testid="ad-frame" />,
}));

describe('<GiveawayRules />', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      keyword: 'Keyword',
      prize: 'Prize',
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <GiveawayRules apiKey="key" />
        </IntlProvider>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
