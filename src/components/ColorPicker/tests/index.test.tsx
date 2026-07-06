import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import ColorPicker from '../index';

const shallowRenderer = createRenderer();

describe('<ColorPicker />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<ColorPicker />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
