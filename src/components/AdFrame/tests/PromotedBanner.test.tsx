import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';

import PromotedBanner from '../PromotedBanner';

describe('<PromotedBanner />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={{}}>
        <PromotedBanner
          channelUrl="https://www.youtube.com/channel/UC3GumCi7taJQ0wWbKK-hR2w"
          imageUrl="url"
          testMargins
          title="test-advertisement"
        />
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
