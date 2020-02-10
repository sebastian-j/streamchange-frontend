import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SettingsDialog from '../index';

const renderer = new ShallowRenderer();

describe('<SettingsDialog />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<SettingsDialog />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
