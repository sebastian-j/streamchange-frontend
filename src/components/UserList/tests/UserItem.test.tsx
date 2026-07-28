import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UserItem from '../components/userItem';

describe('<UserItem />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <UserItem
        channelId="id"
        title="name"
        handleToggleUser={() => 0}
        isEligible
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
