import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import WelcomeDialog from '../index';

const shallowRenderer = createRenderer();

describe('<WelcomeDialog />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<WelcomeDialog passVideo={() => 0} />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
