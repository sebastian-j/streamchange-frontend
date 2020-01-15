import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import RaffleWrapper from '../index';

const renderer = new ShallowRenderer();

describe('<RaffleWrapper />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<RaffleWrapper onWin={() => 0} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
