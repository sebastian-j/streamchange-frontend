import produce from 'immer';

import queueReducer, { initialState } from '../reducer';
import { QueueItem } from '../types';
import {
  changeQueueCommand,
  changeCapacity,
  changeTTI,
  changeTTK,
  changeWidgetCode,
  deleteQueueItem,
  getQueueFromIdb,
  purgeQueue,
  pushQueueItem,
  updateQueueItem,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('queueReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      capacity: 10,
      command: 'join',
      queueArray: [
        { id: 'id', title: 'item1' },
        { id: 'id2', title: 'item2' },
      ],
      timeToIdle: 300,
      timeToKick: 600,
      widgetCode: 'code',
    };
  });

  it('should return the initial state', () => {
    expect(queueReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle the changeCapacity action correctly', () => {
    const fixture = 15;
    const expectedResult = produce(state, (draft) => {
      draft.capacity = fixture;
    });

    expect(queueReducer(state, changeCapacity(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeQueueCommand action correctly', () => {
    const fixture = 'giveaway';
    const expectedResult = produce(state, (draft) => {
      draft.command = fixture;
    });

    expect(queueReducer(state, changeQueueCommand(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeTTI action correctly', () => {
    const fixture = 400;
    const expectedResult = produce(state, (draft) => {
      draft.timeToIdle = fixture;
    });

    expect(queueReducer(state, changeTTI(fixture))).toEqual(expectedResult);
  });

  it('should handle the changeTTK action correctly', () => {
    const fixture = 800;
    const expectedResult = produce(state, (draft) => {
      draft.timeToKick = fixture;
    });

    expect(queueReducer(state, changeTTK(fixture))).toEqual(expectedResult);
  });

  it('should handle the changeWidgetCode action correctly', () => {
    const fixture = 'test password';
    const expectedResult = produce(state, (draft) => {
      draft.widgetCode = fixture;
    });

    expect(queueReducer(state, changeWidgetCode(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the deleteQueueItem action correctly and delete queue item with the given id', () => {
    const fixture = 'id';
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = [{ id: 'id2', title: 'item2' }];
    });

    expect(queueReducer(state, deleteQueueItem(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the deleteQueueItem action correctly and do not delete any item, when incorrect id was given', () => {
    const fixture = 'not-id';
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = [
        { id: 'id', title: 'item1' },
        { id: 'id2', title: 'item2' },
      ];
    });

    expect(queueReducer(state, deleteQueueItem(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getQueueFromIdb action correctly', () => {
    const fixture: QueueItem[] = [
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
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = fixture;
    });

    expect(queueReducer(state, getQueueFromIdb(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the purgeQueue action correctly', () => {
    const fixture = [];
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = fixture;
    });

    expect(queueReducer(state, purgeQueue())).toEqual(expectedResult);
  });

  it('should add item to the queue', () => {
    const newItem = {
      id: 'id3',
      addedAt: '2019-12-24T07:27:56.27-00:00',
      imageUrl: 'url',
      lastActiveAt: '2019-12-24T08:27:56.27-00:00',
      message: 'text',
      title: 'item3',
    };
    const fixture = state.queueArray.map((a) => ({ ...a }));
    fixture.push(newItem);
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = fixture;
    });

    expect(queueReducer(state, pushQueueItem(newItem))).toEqual(expectedResult);
  });

  it('should not add second item with the same id to the queue, instead should update existing item', () => {
    const fixture = [
      { id: 'id', title: 'item1' },
      {
        id: 'id2',
        lastActiveAt: '2019-12-24T08:27:56.27-00:00',
        message: 'text',
        title: 'item2',
      },
    ];
    const newItem = {
      id: 'id2',
      addedAt: '2019-12-24T07:27:56.27-00:00',
      imageUrl: 'url',
      lastActiveAt: '2019-12-24T08:27:56.27-00:00',
      message: 'text',
      title: 'item3',
    };
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = fixture;
    });

    expect(queueReducer(state, pushQueueItem(newItem))).toEqual(expectedResult);
  });

  it('should handle the updateQueueItem action correctly and update message', () => {
    const fixture = [
      { id: 'id', title: 'item1' },
      {
        id: 'id2',
        title: 'item2',
        message: 'abc',
      },
    ];
    const updatedItem = {
      id: 'id2',
      message: 'abc',
    };
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = fixture;
    });

    expect(queueReducer(state, updateQueueItem(updatedItem))).toEqual(
      expectedResult,
    );
  });

  it('should handle the updateQueueItem action correctly and update last activity date', () => {
    const fixture = [
      { id: 'id', title: 'item1' },
      {
        id: 'id2',
        title: 'item2',
        lastActiveAt: '2021-02-13T21:37:00.000Z',
      },
    ];
    const updatedItem = {
      id: 'id2',
      lastActiveAt: '2021-02-13T21:37:00.000Z',
    };
    const expectedResult = produce(state, (draft) => {
      draft.queueArray = fixture;
    });

    expect(queueReducer(state, updateQueueItem(updatedItem))).toEqual(
      expectedResult,
    );
  });
});
