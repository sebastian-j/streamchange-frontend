import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ChatEmbed from '../index';

const renderer = new ShallowRenderer();

describe('<ChatEmbed />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<ChatEmbed videoId="id" />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
