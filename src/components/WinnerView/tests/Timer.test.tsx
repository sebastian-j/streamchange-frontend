import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Timer from '../Timer';

describe('<Timer />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<Timer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
