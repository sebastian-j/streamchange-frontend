import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import configureStore from '../../../configureStore';
import WelcomeDialog from '../index';

vi.mock('../WelcomeHint', () => ({
  default: () => <div data-testid="welcome-hint" />,
}));

describe('<WelcomeDialog />', () => {
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
          <WelcomeDialog />
        </IntlProvider>
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
