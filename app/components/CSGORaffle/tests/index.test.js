import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import CSGORaffle from '../index';

const renderer = new ShallowRenderer();

describe('<CSGORaffle />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<CSGORaffle onClose={() => 0} onWin={() => 0} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
