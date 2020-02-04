import React from 'react';
import renderer from 'react-test-renderer';

import YoutubeWorker from '../index';

describe('<YoutubeWorker />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <YoutubeWorker
          apiKey="key"
          channelId="id"
          liveChatId="chatId"
          videoId="vidId"
        />,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
