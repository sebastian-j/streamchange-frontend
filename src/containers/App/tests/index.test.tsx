import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '../index';

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
