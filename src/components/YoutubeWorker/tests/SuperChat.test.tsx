import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SuperChat from '../SuperChat';

describe('<SuperChat />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <SuperChat imageUrl="url" title="title" message="message" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
