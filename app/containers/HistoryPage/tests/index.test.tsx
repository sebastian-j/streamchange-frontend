import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import HistoryPage from '../index';

const shallowRenderer = createRenderer();

describe('<HistoryPage />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<HistoryPage />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
