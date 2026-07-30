import '@testing-library/jest-dom/vitest';

import axios from 'axios';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { WinnerView } from '../WinnerViewComponent';

const mocks = vi.hoisted(() => {
  const usersTable = {
    filter: vi.fn().mockReturnThis(),
    toArray: vi.fn().mockResolvedValue([]),
    where: vi.fn().mockReturnThis(),
    equals: vi.fn().mockReturnThis(),
    modify: vi.fn().mockResolvedValue(undefined),
  };

  const messagesTable = {
    filter: vi.fn().mockReturnThis(),
    toArray: vi.fn(),
  };

  const historyTable = {
    add: vi.fn().mockResolvedValue(undefined),
  };

  const table = vi.fn((tableName: string) => {
    if (tableName === 'users') {
      return usersTable;
    }

    if (tableName === 'messages') {
      return messagesTable;
    }

    if (tableName === 'history') {
      return historyTable;
    }

    throw new Error(`Unexpected table: ${tableName}`);
  });

  return {
    usersTable,
    messagesTable,
    historyTable,
    table,
  };
});

const mockStore = configureStore([]);

vi.mock('../../StreamerWorker/db', () => ({
  default: {
    table: mocks.table,
  },
}));

const { axiosGetMock } = vi.hoisted(() => ({
  axiosGetMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    get: axiosGetMock,
    post: vi.fn().mockResolvedValue({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }),
  },
}));

const renderWinnerView = (
  props: Partial<React.ComponentProps<typeof WinnerView>> = {}
) => {
  const defaultProps = {
    apiKey: 'api-key',
    id: 'winner-id',
    prize: 'Test prize',
    preWinner: null,
    streamInfo: {
      ownerId: 'owner-id',
    },
    onClose: vi.fn(),
    onRepeat: vi.fn(),
    changePreWinner: vi.fn(),
    toggleEligibility: vi.fn(),
    userArray: [],
  };
  let store: MockStoreEnhanced<unknown, {}>;
  store = mockStore({
    isOpen: false,
  });
  return render(
    <IntlProvider locale="en">
      <Provider store={store}>
        <WinnerView {...defaultProps} {...props} />
      </Provider>
    </IntlProvider>
  );
};

describe('<WinnerView />', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();
    sessionStorage.clear();

    sessionStorage.setItem('gv-videoId', 'video-id');

    /*
     * Restore chainable database methods.
     * This is important when Vitest uses resetMocks/mockReset.
     */
    mocks.usersTable.filter.mockReturnValue(mocks.usersTable);
    mocks.usersTable.where.mockReturnValue(mocks.usersTable);
    mocks.usersTable.equals.mockReturnValue(mocks.usersTable);

    mocks.messagesTable.filter.mockReturnValue(mocks.messagesTable);

    mocks.usersTable.toArray.mockResolvedValue([]);
    mocks.messagesTable.toArray.mockResolvedValue([]);
    mocks.usersTable.modify.mockResolvedValue(undefined);
    mocks.historyTable.add.mockResolvedValue(undefined);

    mocks.table.mockImplementation((tableName: string) => {
      switch (tableName) {
        case 'users':
          return mocks.usersTable;

        case 'messages':
          return mocks.messagesTable;

        case 'history':
          return mocks.historyTable;

        default:
          throw new Error(`Unexpected table: ${tableName}`);
      }
    });

    vi.mocked(axios.get).mockResolvedValue({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    } as never);
  });

  it('renders the loading state while user data is being fetched', () => {
    const onClose = vi.fn();

    renderWinnerView({ onClose });

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('fetches user data and messages after mounting', async () => {
    const user = {
      id: 'winner-id',
      title: 'Test winner',
      imageUrl: 'https://example.com/avatar.png',
      message: 'Original winner message',
    };

    const messages = [
      {
        authorId: 'winner-id',
        publishedAt: '2024-01-01T12:00:00.000Z',
        displayText: 'First winner message',
      },
      {
        authorId: 'winner-id',
        publishedAt: '2024-01-01T12:01:00.000Z',
        displayText: 'Second winner message',
      },
    ];

    mocks.usersTable.toArray.mockResolvedValue([user]);
    mocks.messagesTable.toArray.mockResolvedValue(messages);

    renderWinnerView({
      preWinner: {
        message: 'Pre-winner message',
      },
    });

    expect(mocks.table).toHaveBeenCalledWith('users');
    expect(mocks.table).toHaveBeenCalledWith('messages');

    expect(await screen.findByText('Test winner')).toBeInTheDocument();
    expect(await screen.findByText('First winner message')).toBeInTheDocument();
    expect(
      await screen.findByText('Second winner message')
    ).toBeInTheDocument();
  });

  it('updates the prize value when the prize input changes', async () => {
    mocks.usersTable.toArray.mockResolvedValue([
      {
        id: 'winner-id',
        title: 'Test winner',
        imageUrl: 'https://example.com/avatar.png',
        message: 'Winner message',
      },
    ]);

    renderWinnerView();

    const prizeInput = await screen.findByRole('textbox');

    expect(prizeInput).toHaveValue('Test prize');

    fireEvent.change(prizeInput, {
      target: {
        name: 'prize',
        value: 'Updated prize',
      },
    });

    expect(prizeInput).toHaveValue('Updated prize');
  });

  it('repeats the giveaway and closes the panel', async () => {
    const onRepeat = vi.fn();
    const onClose = vi.fn();

    mocks.usersTable.toArray.mockResolvedValue([
      {
        id: 'winner-id',
        title: 'Test winner',
        imageUrl: 'https://example.com/avatar.png',
        message: 'Winner message',
      },
    ]);

    renderWinnerView({ onRepeat, onClose });

    await screen.findByText('Test winner');

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);

    expect(onRepeat).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('saves the winner and closes the panel', async () => {
    const onClose = vi.fn();

    const user = {
      id: 'winner-id',
      title: 'Test winner',
      imageUrl: 'https://example.com/avatar.png',
      message: 'Winner message',
    };

    mocks.usersTable.toArray.mockResolvedValue([user]);

    renderWinnerView({
      onClose,
      prize: 'Test prize',
    });

    await screen.findByText('Test winner');

    const buttons = screen.getAllByRole('button');
    const saveButton = buttons[buttons.length - 1];

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mocks.historyTable.add).toHaveBeenCalledTimes(1);
    });

    expect(mocks.historyTable.add).toHaveBeenCalledWith(
      expect.objectContaining({
        channelId: 'winner-id',
        displayName: 'Test winner',
        message: 'Winner message',
        prize: 'Test prize',
        createdAt: expect.any(String),
      })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('marks the winner as ineligible when delete winner option is enabled', async () => {
    localStorage.setItem('gv-deleteWinner', 'true');

    const toggleEligibility = vi.fn();

    mocks.usersTable.toArray.mockResolvedValue([
      {
        id: 'winner-id',
        title: 'Test winner',
        imageUrl: 'https://example.com/avatar.png',
        message: 'Winner message',
      },
    ]);

    renderWinnerView({ toggleEligibility });

    await screen.findByText('Test winner');

    const buttons = screen.getAllByRole('button');
    const saveButton = buttons[buttons.length - 1];

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toggleEligibility).toHaveBeenCalledTimes(1);
    });

    expect(toggleEligibility).toHaveBeenCalledWith('winner-id');
  });
});
