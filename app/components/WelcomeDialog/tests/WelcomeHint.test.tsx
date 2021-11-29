import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import WelcomeHint from '../WelcomeHint';

const shallowRenderer = createRenderer();

describe('<WelcomeHint />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<WelcomeHint />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
