import { describe, expect, it } from 'vitest';

import {
  changeCapacity,
  changeQueueCommand,
  changeTTI,
  changeTTK,
  changeWidgetCode,
  deleteQueueItem,
  getQueueFromIdb,
  purgeQueue,
  pushQueueItem,
  updateQueueItem,
} from '../actions';
import queueReducer, { initialState } from '../reducer';
import { QueueItem } from '../types';

type QueueState = ReturnType<typeof queueReducer>;

const createState = (): QueueState => ({
  ...initialState,
  capacity: 10,
  command: 'join',
  queueArray: [
    { id: 'id', title: 'item1' },
    { id: 'id2', title: 'item2' },
  ] as never[],
  timeToIdle: 300,
  timeToKick: 600,
  widgetCode: 'code',
});

describe('queueReducer', () => {
  it('should return the initial state', () => {
    expect(queueReducer(undefined, { type: '@@INIT' } as any)).toEqual(
      initialState
    );
  });

  it('should handle changeCapacity action correctly', () => {
    const state = createState();

    expect(queueReducer(state, changeCapacity(15))).toEqual({
      ...state,
      capacity: 15,
    });
  });

  it('should handle changeQueueCommand action correctly', () => {
    const state = createState();

    expect(queueReducer(state, changeQueueCommand('giveaway'))).toEqual({
      ...state,
      command: 'giveaway',
    });
  });

  it('should handle changeTTI action correctly', () => {
    const state = createState();

    expect(queueReducer(state, changeTTI(400))).toEqual({
      ...state,
      timeToIdle: 400,
    });
  });

  it('should handle changeTTK action correctly', () => {
    const state = createState();

    expect(queueReducer(state, changeTTK(800))).toEqual({
      ...state,
      timeToKick: 800,
    });
  });

  it('should handle changeWidgetCode action correctly', () => {
    const state = createState();

    expect(queueReducer(state, changeWidgetCode('test password'))).toEqual({
      ...state,
      widgetCode: 'test password',
    });
  });

  it('should delete queue item with the given id', () => {
    const state = createState();

    expect(queueReducer(state, deleteQueueItem('id'))).toEqual({
      ...state,
      queueArray: [{ id: 'id2', title: 'item2' }],
    });
  });

  it('should not delete any item when incorrect id was given', () => {
    const state = createState();

    expect(queueReducer(state, deleteQueueItem('not-id'))).toEqual(state);
  });

  it('should handle getQueueFromIdb action correctly', () => {
    const state = createState();

    const queueFromIdb: QueueItem[] = [
      {
        id: 'id',
        addedAt: '2019-12-23T07:27:56.27-00:00',
        imageUrl: 'url',
        lastActiveAt: '2019-12-23T08:27:56.27-00:00',
        message: 'text',
        title: 'item1',
      },
      {
        id: 'id2',
        addedAt: '2019-12-24T07:27:56.27-00:00',
        imageUrl: 'url',
        lastActiveAt: '2019-12-24T08:27:56.27-00:00',
        message: 'text',
        title: 'item2',
      },
      {
        id: 'id3',
        addedAt: '2019-12-25T07:27:56.27-00:00',
        imageUrl: 'url',
        lastActiveAt: '2019-12-25T08:27:56.27-00:00',
        message: 'text',
        title: 'item3',
      },
    ];

    expect(queueReducer(state, getQueueFromIdb(queueFromIdb))).toEqual({
      ...state,
      queueArray: queueFromIdb,
    });
  });

  it('should handle purgeQueue action correctly', () => {
    const state = createState();

    expect(queueReducer(state, purgeQueue())).toEqual({
      ...state,
      queueArray: [],
    });
  });

  it('should add item to the queue', () => {
    const state = createState();

    const newItem: QueueItem = {
      id: 'id3',
      addedAt: '2019-12-24T07:27:56.27-00:00',
      imageUrl: 'url',
      lastActiveAt: '2019-12-24T08:27:56.27-00:00',
      message: 'text',
      title: 'item3',
    };

    expect(queueReducer(state, pushQueueItem(newItem))).toEqual({
      ...state,
      queueArray: [...state.queueArray, newItem],
    });
  });

  it('should not add second item with the same id, but should update existing item', () => {
    const state = createState();

    const newItem: QueueItem = {
      id: 'id2',
      addedAt: '2019-12-24T07:27:56.27-00:00',
      imageUrl: 'url',
      lastActiveAt: '2019-12-24T08:27:56.27-00:00',
      message: 'text',
      title: 'item3',
    };

    expect(queueReducer(state, pushQueueItem(newItem))).toEqual({
      ...state,
      queueArray: [
        { id: 'id', title: 'item1' },
        {
          id: 'id2',
          title: 'item2',
          lastActiveAt: '2019-12-24T08:27:56.27-00:00',
          message: 'text',
        },
      ],
    });
  });

  it('should handle updateQueueItem action correctly and update message', () => {
    const state = createState();

    const updatedItem: Partial<QueueItem> & Pick<QueueItem, 'id'> = {
      id: 'id2',
      message: 'abc',
    };

    expect(queueReducer(state, updateQueueItem(updatedItem))).toEqual({
      ...state,
      queueArray: [
        { id: 'id', title: 'item1' },
        {
          id: 'id2',
          title: 'item2',
          message: 'abc',
        },
      ],
    });
  });

  it('should handle updateQueueItem action correctly and update last activity date', () => {
    const state = createState();

    const updatedItem: Partial<QueueItem> & Pick<QueueItem, 'id'> = {
      id: 'id2',
      lastActiveAt: '2021-02-13T21:37:00.000Z',
    };

    expect(queueReducer(state, updateQueueItem(updatedItem))).toEqual({
      ...state,
      queueArray: [
        { id: 'id', title: 'item1' },
        {
          id: 'id2',
          title: 'item2',
          lastActiveAt: '2021-02-13T21:37:00.000Z',
        },
      ],
    });
  });
});
