import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import Timer from '../Timer';

const shallowRenderer = createRenderer();

describe('<Timer />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<Timer />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
