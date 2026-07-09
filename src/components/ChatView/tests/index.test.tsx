import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ChatEmbed from '../ChatEmbed';

describe('<ChatEmbed />', () => {
  it('should render Twitch chat and match the snapshot', () => {
    const { container } = render(<ChatEmbed channel="id" platform="twitch" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render Kick chat and match the snapshot', () => {
    const { container } = render(<ChatEmbed channel="id" platform="kick" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
