import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SuperChat from '../SuperChat';

const renderer = new ShallowRenderer();

describe('<SuperChat />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <SuperChat imageUrl="url" title="title" message="message" />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
