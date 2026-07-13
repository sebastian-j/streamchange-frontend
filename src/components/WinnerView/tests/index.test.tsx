import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { WinnerView } from '../index';

const tableMock = {
  filter: vi.fn().mockReturnThis(),
  toArray: vi.fn().mockResolvedValue([]),
  where: vi.fn().mockReturnThis(),
  equals: vi.fn().mockReturnThis(),
  modify: vi.fn().mockResolvedValue(undefined),
  add: vi.fn().mockResolvedValue(undefined),
};

vi.mock('../../YoutubeWorker/db', () => ({
  default: {
    table: vi.fn(() => tableMock),
  },
}));

describe('<WinnerView />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render and match the snapshot', () => {
    const onClose = vi.fn();
    const onRepeat = vi.fn();
    const changePreWinner = vi.fn();

    const { container } = render(
      <IntlProvider locale="en">
        <WinnerView
          apiKey="key"
          id="id"
          prize="Test prize"
          preWinner={null}
          streamInfo={{ ownerId: 'owner-id' }}
          onClose={onClose}
          onRepeat={onRepeat}
          changePreWinner={changePreWinner}
        />
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
