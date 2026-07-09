import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RelativeDate from '../index';

describe('<RelativeDate />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <RelativeDate ISO8601Date="2019-12-24T07:27:56.27-00:00" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
