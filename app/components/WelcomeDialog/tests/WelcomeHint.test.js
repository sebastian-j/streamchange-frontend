import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WelcomeHint from '../WelcomeHint';

const renderer = new ShallowRenderer();

describe('<WelcomeHint />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<WelcomeHint />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
