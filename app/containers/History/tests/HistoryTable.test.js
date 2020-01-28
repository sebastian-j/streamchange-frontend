import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HistoryTable from '../HistoryTable';

const renderer = new ShallowRenderer();

describe('<HistoryTable />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
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
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
