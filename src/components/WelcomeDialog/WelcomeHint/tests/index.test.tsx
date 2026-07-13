import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import WelcomeHint from '../index';

describe('<WelcomeHint />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<WelcomeHint />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
