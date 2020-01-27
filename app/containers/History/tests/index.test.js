import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import History from '../index';

const renderer = new ShallowRenderer();

describe('<History />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<History />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
