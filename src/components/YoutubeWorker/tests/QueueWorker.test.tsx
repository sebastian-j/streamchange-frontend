import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import QueueWorker, { mapDispatchToProps } from '../QueueWorker';

import { addMessage } from '../../ChatView/actions';
import { changeColor } from '../../../containers/StyleProvider/actions';
import {
  deleteQueueItem,
  pushQueueItem,
  updateQueueItem,
} from '../../../containers/QueuePage/actions';

const { axiosGetMock } = vi.hoisted(() => ({
  axiosGetMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    get: axiosGetMock,
  },
}));

vi.mock('../../../config', () => ({
  API_URL: 'https://example.com/api',
  PRIVILEGED_CHANNELS: ['privileged-user'],
}));

vi.mock('../../ChatView/actions', () => ({
  addMessage: vi.fn((message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
  })),
}));

vi.mock('../../../containers/StyleProvider/actions', () => ({
  changeColor: vi.fn((color) => ({
    type: 'CHANGE_COLOR',
    payload: color,
  })),
}));

vi.mock('../../../containers/QueuePage/actions', () => ({
  deleteQueueItem: vi.fn((id) => ({
    type: 'DELETE_QUEUE_ITEM',
    payload: id,
  })),
  pushQueueItem: vi.fn((item) => ({
    type: 'PUSH_QUEUE_ITEM',
    payload: item,
  })),
  updateQueueItem: vi.fn((item) => ({
    type: 'UPDATE_QUEUE_ITEM',
    payload: item,
  })),
}));

vi.mock('../../ChatView', () => ({
  default: ({ videoId }: { videoId: string }) => (
    <div data-testid="chat-view">{videoId}</div>
  ),
}));

vi.mock('../../../containers/QueuePage/QueueColumn', () => ({
  default: () => <div data-testid="queue-column" />,
}));

vi.mock('../../../containers/QueuePage/QueueRules', () => ({
  default: () => <div data-testid="queue-rules" />,
}));

vi.mock('../../AdFrame', () => ({
  default: () => <div data-testid="ad-frame" />,
}));

vi.mock('../SuperChat', () => ({
  default: ({
    imageUrl,
    message,
    title,
  }: {
    imageUrl: string;
    message: string;
    title: string;
  }) => (
    <div data-testid="super-chat">
      <span data-testid="super-chat-title">{title}</span>
      <span data-testid="super-chat-message">{message}</span>
      <img alt={title} src={imageUrl} />
    </div>
  ),
}));

const mockStore = configureStore([]);

const renderQueueWorker = (
  props: Partial<React.ComponentProps<typeof QueueWorker>> = {}
) => {
  const defaultProps = {
    addMessage: vi.fn(),
    deleteItem: vi.fn(),
    onColorChange: vi.fn(),
    pushItem: vi.fn(),
    updateItem: vi.fn(),
    videoId: 'test',
  };

  const store = mockStore({
      queueArray: [
        {
          id: 'id',
          addedAt: '2019-12-24T07:27:56.27-00:00',
          imageUrl: 'url',
          lastActiveAt: '2019-12-24T08:27:56.27-00:00',
          message: 'text',
          title: 'item1',
        },
        {
          id: 'id2',
          addedAt: '2019-12-24T09:27:56.27-00:00',
          imageUrl: 'url2',
          lastActiveAt: '2019-12-24T10:27:56.27-00:00',
          message: 'text',
          title: 'item2',
        },
      ],
    });

  return render(
    <Provider store={store}>
      <QueueWorker {...defaultProps} {...props} />
    </Provider>
  );
};

describe('QueueWorker', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    axiosGetMock.mockResolvedValue({
      data: {
        tag: 'next-token',
        pollingIntervalMillis: 60000,
        items: [],
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders queue sections and chat view', () => {
    renderQueueWorker({ videoId: 'test-video' });

    expect(screen.getByTestId('queue-column')).toBeInTheDocument();
    expect(screen.getByTestId('queue-rules')).toBeInTheDocument();
    expect(screen.getByTestId('chat-view')).toHaveTextContent('test-video');
  });

  it('does not request messages for the test video', () => {
    renderQueueWorker({ videoId: 'test' });

    expect(axiosGetMock).not.toHaveBeenCalled();
  });

  it('requests messages using the stored page token', async () => {
    localStorage.setItem('nextPageToken', 'stored-token');
    localStorage.setItem('queue-command', '!join');

    axiosGetMock.mockResolvedValueOnce({
      data: {
        tag: 'new-token',
        pollingIntervalMillis: 30000,
        items: [],
      },
    });

    renderQueueWorker({ videoId: 'video-id' });

    await waitFor(() => {
      expect(axiosGetMock).toHaveBeenCalledWith(
        'https://example.com/api/v4/m?maxResults=200&id=video-id&pageToken=stored-token'
      );
    });

    expect(localStorage.getItem('nextPageToken')).toBe('new-token');
  });

  it('uses a blank page token when no token is stored', async () => {
    localStorage.setItem('queue-command', '!join');

    axiosGetMock.mockResolvedValueOnce({
      data: {
        tag: 'new-token',
        pollingIntervalMillis: 30000,
        items: [],
      },
    });

    renderQueueWorker({ videoId: 'video-id' });

    await waitFor(() => {
      expect(axiosGetMock).toHaveBeenCalledWith(
        'https://example.com/api/v4/m?maxResults=200&id=video-id&pageToken= '
      );
    });
  });

  it('maps dispatch functions to component props', () => {
    const dispatch = vi.fn();
    const mappedProps = mapDispatchToProps(dispatch);

    mappedProps.addMessage({ message: 'Hello' });
    mappedProps.deleteItem('item-id');
    mappedProps.onColorChange('blue');
    mappedProps.pushItem({ id: 'item-id' });
    mappedProps.updateItem({ id: 'item-id' });

    expect(addMessage).toHaveBeenCalledWith({ message: 'Hello' });
    expect(deleteQueueItem).toHaveBeenCalledWith('item-id');
    expect(changeColor).toHaveBeenCalledWith('blue');
    expect(pushQueueItem).toHaveBeenCalledWith({ id: 'item-id' });
    expect(updateQueueItem).toHaveBeenCalledWith({ id: 'item-id' });

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(mappedProps.dispatch).toBe(dispatch);
  });
});
