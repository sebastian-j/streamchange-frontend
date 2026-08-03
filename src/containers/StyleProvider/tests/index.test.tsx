import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StyleProvider } from '../StyleProviderComponent';

describe('<StyleProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(<StyleProvider isDarkMode>{children}</StyleProvider>);
    expect(container.firstChild).not.toBeNull();
  });
});
