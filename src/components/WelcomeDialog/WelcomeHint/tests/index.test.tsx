import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IntlProvider } from 'react-intl';
import { describe, expect, it, vi } from 'vitest';

import { HINTS } from '../../../../config';
import WelcomeHint from '../index';

describe('<WelcomeHint />', () => {
  it('should render and match the snapshot', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const { container } = render(
      <IntlProvider locale="en">
        <WelcomeHint />
      </IntlProvider>
    );
    expect(screen.getByText(HINTS[0])).toBeInTheDocument();
  });
});
