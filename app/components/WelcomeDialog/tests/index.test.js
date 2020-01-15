import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WelcomeDialog from '../index';

const renderer = new ShallowRenderer();

describe('<WelcomeDialog />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<WelcomeDialog passVideo={() => 0} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
