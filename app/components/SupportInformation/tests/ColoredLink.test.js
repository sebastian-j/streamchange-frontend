import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ColoredLink from '../ColoredLink';

const renderer = new ShallowRenderer();

describe('<ColoredLink />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<ColoredLink />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
