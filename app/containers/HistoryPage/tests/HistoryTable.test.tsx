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
            channelId: 'id',
            displayName: 'name',
            createdAt: '2019-12-24T07:27:56.273Z',
          },
        ]}
      />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
