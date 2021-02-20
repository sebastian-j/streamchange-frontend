import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import FortuneWheelRaffle from '../index';

const renderer = new ShallowRenderer();

describe('<FortuneWheelRaffle />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<FortuneWheelRaffle onClose={() => 0} onWin={() => 0} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
