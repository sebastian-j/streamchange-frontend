import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SubStatus from '../SubStatus';

const renderer = new ShallowRenderer();

describe('<SubStatus />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<SubStatus apiKey="key" id="id" ownerId="owner" />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
