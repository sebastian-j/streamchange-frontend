import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import ArrowUpIcon from '../arrowUpIcon';

const shallowRenderer = createRenderer();

describe('<ArrowUpIcon />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<ArrowUpIcon />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
