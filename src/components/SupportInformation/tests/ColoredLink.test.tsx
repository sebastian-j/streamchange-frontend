import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ColoredLink from '../ColoredLink';

describe('<ColoredLink />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<ColoredLink />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
