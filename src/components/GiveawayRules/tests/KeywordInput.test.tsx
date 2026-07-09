import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import KeywordInput from '../KeywordInput';

const mockStore = configureStore([]);

describe('<KeywordInput />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      keyword: 'Keyword',
      prize: 'Prize',
    });
  });
  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale="en">
            <KeywordInput />
          </IntlProvider>
        </Provider>
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
