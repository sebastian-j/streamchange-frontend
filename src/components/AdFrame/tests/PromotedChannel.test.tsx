import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import PromotedChannel from '../PromotedChannel';

const shallowRenderer = createRenderer();

describe('<PromotedChannel />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <PromotedChannel
        channelUrl="https://www.youtube.com/channel/UC3GumCi7taJQ0wWbKK-hR2w"
        imageUrl="https://yt3.ggpht.com/ytc/AAUvwnjMKD2nkjne8W3-jn2yCf-lOdD2P1wTJ0Q_G9X72w=s88-c-k-c0x00ffffff-no-rj"
      />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
