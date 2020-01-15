import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import UserList from '../index';

const renderer = new ShallowRenderer();

describe('<UserList />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<UserList />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
