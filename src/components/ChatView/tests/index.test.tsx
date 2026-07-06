import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import ChatEmbed from '../ChatEmbed';

const shallowRenderer = createRenderer();

describe('<ChatEmbed />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<ChatEmbed videoId="id" />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
