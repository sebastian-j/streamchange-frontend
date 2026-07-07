import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import PromotedBanner from '../PromotedBanner';

const shallowRenderer = createRenderer();

describe('<PromotedBanner />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <PromotedBanner
        channelUrl="https://www.youtube.com/channel/UC3GumCi7taJQ0wWbKK-hR2w"
        imageUrl="url"
        testMargins
        title="test-advertisement"
      />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
