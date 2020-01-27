import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HistoryTable from '../HistoryTable';

const renderer = new ShallowRenderer();

describe('<HistoryTable />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <HistoryTable items={[{ id: 'id', displayName: 'name' }]} />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
