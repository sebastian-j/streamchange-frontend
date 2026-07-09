import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import GiveawayRules from '../index';

const mockStore = configureStore([]);

describe('<GiveawayRules />', () => {
  let store;
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
