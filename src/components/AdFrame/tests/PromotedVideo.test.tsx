import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';

import PromotedVideo from '../PromotedVideo';

describe('<PromotedVideo />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <PromotedVideo videoId="jNQXAC9IVRw" />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
