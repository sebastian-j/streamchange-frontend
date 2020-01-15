import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import NumericInput from '../index';

const renderer = new ShallowRenderer();

describe('<NumericInput />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<NumericInput onChange={() => 0} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
