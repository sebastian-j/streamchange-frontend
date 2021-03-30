import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import RelativeDate from '../index';

const renderer = new ShallowRenderer();

describe('<RelativeDate />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <RelativeDate ISO8601Date="2019-12-24T07:27:56.27-00:00" />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
