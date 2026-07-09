import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { describe, it, expect } from '@jest/globals';

import SuperChat from '../SuperChat';

const shallowRenderer = createRenderer();

describe('<SuperChat />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <SuperChat imageUrl="url" title="title" message="message" />
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
