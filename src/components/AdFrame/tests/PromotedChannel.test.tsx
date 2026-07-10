import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PromotedChannel from '../PromotedChannel';

describe('<PromotedChannel />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <PromotedChannel
        channelUrl="https://www.youtube.com/channel/UC3GumCi7taJQ0wWbKK-hR2w"
        imageUrl="https://yt3.ggpht.com/ytc/AAUvwnjMKD2nkjne8W3-jn2yCf-lOdD2P1wTJ0Q_G9X72w=s88-c-k-c0x00ffffff-no-rj"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
