import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HistoryItem from '../HistoryItem';

const renderer = new ShallowRenderer();

describe('<HistoryItem />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <HistoryItem
        channelId="id"
        displayName="abc"
        message="abc"
        prize="prize"
        imageUrl="url"
        createdAt="2019-12-24T07:27:56.273Z"
      />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
