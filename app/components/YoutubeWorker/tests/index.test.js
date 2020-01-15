import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import YoutubeWorker from '../index';

const renderer = new ShallowRenderer();

describe('<YoutubeWorker />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <YoutubeWorker
        apiKey="key"
        channelId="id"
        liveChatId="chatId"
        videoId="vidId"
      />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
