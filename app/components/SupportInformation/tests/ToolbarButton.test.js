import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ToolbarButton from '../ToolbarButton';

const renderer = new ShallowRenderer();

describe('<ToolbarButton />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<ToolbarButton />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
