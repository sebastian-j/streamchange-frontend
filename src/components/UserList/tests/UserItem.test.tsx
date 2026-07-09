import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import UserItem from '../userItem';

describe('<UserItem />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <UserItem
        channelId="id"
        title="name"
        handleToggleUser={() => 0}
        isModerator
        isEligible
        isSubscriber={false}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
