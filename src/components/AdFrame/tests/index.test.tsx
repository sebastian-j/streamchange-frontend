import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';

import AdFrame from '../index';

describe('<AdFrame />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={{}}>
        <AdFrame />
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
