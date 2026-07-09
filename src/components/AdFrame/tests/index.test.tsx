import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import AdFrame from '../index';

describe('<AdFrame />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<AdFrame />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
