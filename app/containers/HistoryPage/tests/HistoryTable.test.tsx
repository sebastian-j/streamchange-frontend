import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import HistoryTable from '../HistoryTable';

const shallowRenderer = createRenderer();

describe('<HistoryTable />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <HistoryTable
        items={[
          {
            id: 1,
            channelId: 'id',
            createdAt: '2019-12-24T07:27:56.273Z',
            displayName: 'name',
            imageUrl: 'url',
            message: 'test message',
            prize: 'trophy',
          },
        ]}
      />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
