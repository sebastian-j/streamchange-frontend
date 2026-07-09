import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ArrowUpIcon from '../components/arrowUpIcon';

describe('<ArrowUpIcon />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<ArrowUpIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
