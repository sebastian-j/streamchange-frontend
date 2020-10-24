import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ColorPicker from '../index';

const renderer = new ShallowRenderer();

describe('<ColorPicker />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<ColorPicker />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
