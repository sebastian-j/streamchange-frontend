import React from 'react';
import { IntlProvider } from 'react-intl';
import { createRenderer } from 'react-test-renderer/shallow';

import HistoryPage from '../index';

const shallowRenderer = createRenderer();

describe('<HistoryPage />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <IntlProvider locale="en">
        <HistoryPage />
      </IntlProvider>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
