import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import UserItem from '../userItem';

const renderer = new ShallowRenderer();

describe('<UserItem />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <UserItem
        channelId="id"
        title="name"
        handleToggleUser={() => 0}
        isModerator
        isEligible
        isSponsor={false}
      />,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
