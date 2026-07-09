import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { StyleProvider } from '../index';

describe('<StyleProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(<StyleProvider>{children}</StyleProvider>);
    expect(container.firstChild).not.toBeNull();
  });
});
