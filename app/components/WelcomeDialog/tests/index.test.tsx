import React from 'react';
import { IntlProvider } from 'react-intl';
import { createRenderer } from 'react-test-renderer/shallow';

import WelcomeDialog from '../index';

const shallowRenderer = createRenderer();

describe('<WelcomeDialog />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <IntlProvider locale="en">
        <WelcomeDialog passVideo={() => 0} />
      </IntlProvider>
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
