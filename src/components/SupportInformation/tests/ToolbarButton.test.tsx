import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import ToolbarButton from '../ToolbarButton';

const shallowRenderer = createRenderer();

describe('<ToolbarButton />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<ToolbarButton />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
