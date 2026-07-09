import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MessageItem from '../MessageItem';

describe('<MessageItem />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <MessageItem date="2019-12-24T07:27:56.27" text="text" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
