import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MessageItem from '../MessageItem';

const renderer = new ShallowRenderer();

describe('<MessageItem />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<MessageItem date="2019-12-24T07:27:56.27" text="text" />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
