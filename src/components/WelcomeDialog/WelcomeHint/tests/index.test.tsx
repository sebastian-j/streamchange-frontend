import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';

import WelcomeHint from '../index';

describe('<WelcomeHint />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <WelcomeHint />
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
