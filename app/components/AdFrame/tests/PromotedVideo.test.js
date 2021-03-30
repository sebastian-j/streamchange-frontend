import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import PromotedVideo from '../PromotedVideo';

const renderer = new ShallowRenderer();

describe('<PromotedVideo />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<PromotedVideo videoId="jNQXAC9IVRw" />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
