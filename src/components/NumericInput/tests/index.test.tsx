import React from 'react';
import { IntlProvider } from 'react-intl';
import { createRenderer } from 'react-test-renderer/shallow';

import NumericInput from '../index';

const shallowRenderer = createRenderer();

describe('<NumericInput />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <IntlProvider locale="en">
        <NumericInput onChange={() => 0} />
      </IntlProvider>
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
