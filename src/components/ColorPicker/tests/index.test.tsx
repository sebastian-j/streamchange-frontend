import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ColorPicker from '../index';

describe('<ColorPicker />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<ColorPicker />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
