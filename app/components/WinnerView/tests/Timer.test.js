import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Timer from '../Timer';

const renderer = new ShallowRenderer();

describe('<Timer />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<Timer />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
