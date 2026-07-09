import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HistoryTable from '../HistoryTable';

describe('<HistoryTable />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <HistoryTable
        items={[
          {
            id: 1,
            channelId: 'id',
            createdAt: '2019-12-24T07:27:56.273Z',
            displayName: 'name',
            imageUrl: 'url',
            message: 'test message',
            prize: 'trophy',
          },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
