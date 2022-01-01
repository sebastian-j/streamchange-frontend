import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import NumericInput from '../index';

const shallowRenderer = createRenderer();

describe('<NumericInput />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<NumericInput onChange={() => 0} />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
