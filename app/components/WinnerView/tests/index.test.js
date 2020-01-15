import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WinnerView from '../index';

const renderer = new ShallowRenderer();

describe('<WinnerView />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <WinnerView apiKey="key" id="id" ownerId="owner" onClose={() => 0} />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
