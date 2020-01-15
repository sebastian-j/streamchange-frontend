import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import KeywordInput from '../KeywordInput';

const renderer = new ShallowRenderer();

describe('<KeywordInput />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<KeywordInput />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
