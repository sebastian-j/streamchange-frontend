import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { describe, it, expect } from 'vitest';

import WelcomeHint from '../index';

const shallowRenderer = createRenderer();

describe('<WelcomeHint />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<WelcomeHint />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
