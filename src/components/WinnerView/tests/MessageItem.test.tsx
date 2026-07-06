import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import MessageItem from '../MessageItem';

const shallowRenderer = createRenderer();

describe('<MessageItem />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <MessageItem date="2019-12-24T07:27:56.27" text="text" />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
