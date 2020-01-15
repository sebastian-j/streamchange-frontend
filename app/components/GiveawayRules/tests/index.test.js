import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GiveawayRules from '../index';

const renderer = new ShallowRenderer();

describe('<GiveawayRules />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<GiveawayRules apiKey="key" channelId="id" />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
