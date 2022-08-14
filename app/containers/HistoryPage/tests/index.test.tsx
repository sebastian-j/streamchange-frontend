import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import HistoryPage from '../index';

describe('<HistoryPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <HistoryPage />
      </IntlProvider>);
    expect(firstChild).toMatchSnapshot();
  });
});
