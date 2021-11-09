import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import KeywordInput from '../KeywordInput';

describe('<KeywordInput />', () => {
  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale="en">
          <KeywordInput />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
