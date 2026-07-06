import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import HistoryItem from '../HistoryItem';

const shallowRenderer = createRenderer();

describe('<HistoryItem />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <HistoryItem
        channelId="id"
        displayName="abc"
        message="abc"
        prize="prize"
        imageUrl="url"
        createdAt="2019-12-24T07:27:56.273Z"
      />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
