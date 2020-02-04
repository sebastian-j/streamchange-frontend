import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ArrowUpIcon from '../arrowUpIcon';

const renderer = new ShallowRenderer();

describe('<ArrowUpIcon />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<ArrowUpIcon />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
