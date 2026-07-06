import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import ColoredLink from '../ColoredLink';

const shallowRenderer = createRenderer();

describe('<ColoredLink />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<ColoredLink />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
