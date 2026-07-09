import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import NumericInput from '../index';

describe('<NumericInput />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <NumericInput onChange={() => 0} />
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
