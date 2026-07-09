import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { describe, it, expect } from '@jest/globals';

import AdFrame from '../index';

const shallowRenderer = createRenderer();

describe('<AdFrame />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<AdFrame />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
