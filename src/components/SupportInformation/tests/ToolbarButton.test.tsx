import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ToolbarButton from '../ToolbarButton';

describe('<ToolbarButton />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<ToolbarButton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
