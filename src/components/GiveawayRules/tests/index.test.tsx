import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it } from 'vitest';

import GiveawayRules from '../index';

const mockStore = configureStore([]);

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
        <GiveawayRules apiKey="key" />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
