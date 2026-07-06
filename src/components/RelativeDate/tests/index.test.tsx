import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import RelativeDate from '../index';

const shallowRenderer = createRenderer();

describe('<RelativeDate />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <RelativeDate ISO8601Date="2019-12-24T07:27:56.27-00:00" />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
