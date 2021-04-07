import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import PromotedBanner from '../PromotedBanner';

const renderer = new ShallowRenderer();

describe('<PromotedBanner />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <PromotedBanner
        channelUrl="https://www.youtube.com/channel/UC3GumCi7taJQ0wWbKK-hR2w"
        imageUrl="url"
        testMargins
        title="test-advertisement"
      />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
