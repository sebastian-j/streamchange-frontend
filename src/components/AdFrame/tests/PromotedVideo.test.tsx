import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import PromotedVideo from '../PromotedVideo';

const shallowRenderer = createRenderer();

describe('<PromotedVideo />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<PromotedVideo videoId="jNQXAC9IVRw" />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
