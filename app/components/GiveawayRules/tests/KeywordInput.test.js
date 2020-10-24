import React from 'react';
import renderer from 'react-test-renderer';
import KeywordInput from '../KeywordInput';

describe('<KeywordInput />', () => {
  it('should render and match the snapshot', () => {
    const renderedComponent = renderer.create(<KeywordInput />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
