import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HistoryItem from '../HistoryItem';

describe('<HistoryItem />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <HistoryItem
        channelId="id"
        displayName="abc"
        message="abc"
        prize="prize"
        imageUrl="url"
        createdAt="2019-12-24T07:27:56.273Z"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
