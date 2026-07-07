import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import UserItem from '../userItem';

const shallowRenderer = createRenderer();

describe('<UserItem />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <UserItem
        channelId="id"
        title="name"
        handleToggleUser={() => 0}
        isModerator
        isEligible
        isSponsor={false}
      />,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
