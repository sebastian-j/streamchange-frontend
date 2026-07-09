import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { describe, it, expect } from 'vitest';

import ChatEmbed from '../ChatEmbed';

const shallowRenderer = createRenderer();

describe('<ChatEmbed />', () => {
  it('should render Twitch chat and match the snapshot', () => {
    shallowRenderer.render(<ChatEmbed channel="id" platform="twitch" />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should render Kick chat and match the snapshot', () => {
    shallowRenderer.render(<ChatEmbed channel="id" platform="kick" />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
