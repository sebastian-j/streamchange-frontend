import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ColoredLink from '../ColoredLink';

describe('<ColoredLink />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<ColoredLink />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
