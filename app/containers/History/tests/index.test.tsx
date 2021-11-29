import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import History from '../index';

const shallowRenderer = createRenderer();

describe('<History />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<History />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
