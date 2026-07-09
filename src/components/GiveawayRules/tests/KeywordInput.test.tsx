import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import KeywordInput from '../KeywordInput';

const mockStore = configureStore([]);

describe('<KeywordInput />', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      keyword: 'Keyword',
      prize: 'Prize',
    });
  });
  it('should render and match the snapshot', () => {
    const { container} = render(
        <Provider store={store}>
          <IntlProvider locale="en">
            <KeywordInput />
          </IntlProvider>
        </Provider>
      );
    expect(container.firstChild).toMatchSnapshot();
  });
});
