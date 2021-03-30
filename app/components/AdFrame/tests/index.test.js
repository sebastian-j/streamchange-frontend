import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AdFrame from '../index';

const renderer = new ShallowRenderer();

describe('<AdFrame />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<AdFrame />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
