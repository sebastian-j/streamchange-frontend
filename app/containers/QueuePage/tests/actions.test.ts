import {
  CHANGE_QUEUE_COMMAND,
  CHANGE_QUEUE_CAPACITY,
  CHANGE_QUEUE_TTI,
  CHANGE_QUEUE_TTK,
  CHANGE_QUEUE_WIDGET_CODE,
  DELETE_QUEUE_ITEM,
  GET_QUEUE_FROM_IDB,
  PURGE_QUEUE,
  PUSH_QUEUE_ITEM,
  UPDATE_QUEUE_ITEM,
} from '../constants';

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

describe('QueuePage Actions', () => {
  describe('changeQueueCommand', () => {
    it('should return the correct type and the passed command', () => {
      const fixture = 'join';
      const expectedResult = {
        type: CHANGE_QUEUE_COMMAND,
        command: fixture,
      };

      expect(changeQueueCommand(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeCapacity', () => {
    it('should return the correct type and the passed capacity', () => {
      const fixture = 10;
      const expectedResult = {
        type: CHANGE_QUEUE_CAPACITY,
        capacity: fixture,
      };

      expect(changeCapacity(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeQueueTTI', () => {
    it('should return the correct type and the passed integer', () => {
      const fixture = 300;
      const expectedResult = {
        type: CHANGE_QUEUE_TTI,
        timeToIdle: fixture,
      };

      expect(changeTTI(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeQueueTTK', () => {
    it('should return the correct type and the passed integer', () => {
      const fixture = 300;
      const expectedResult = {
        type: CHANGE_QUEUE_TTK,
        timeToKick: fixture,
      };

      expect(changeTTK(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeQueueWidgetCode', () => {
    it('should return the correct type and the passed code', () => {
      const fixture = 'code';
      const expectedResult = {
        type: CHANGE_QUEUE_WIDGET_CODE,
        widgetCode: fixture,
      };

      expect(changeWidgetCode(fixture)).toEqual(expectedResult);
    });
  });
  describe('deleteQueueItem', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = 'id';
      const expectedResult = {
        type: DELETE_QUEUE_ITEM,
        id: fixture,
      };

      expect(deleteQueueItem(fixture)).toEqual(expectedResult);
    });
  });
  describe('getQueueItemFromIDB', () => {
    it('should return the correct type and the passed array', () => {
      const fixture = [{ id: 'id', title: 'queueItem' }];
      const expectedResult = {
        type: GET_QUEUE_FROM_IDB,
        queueArray: fixture,
      };

      expect(getQueueFromIdb(fixture)).toEqual(expectedResult);
    });
  });
  describe('purgeQueue', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: PURGE_QUEUE,
      };

      expect(purgeQueue()).toEqual(expectedResult);
    });
  });
  describe('pushQueueItem', () => {
    it('should return the correct type and the passed item', () => {
      const fixture = { id: 'id', title: 'item' };
      const expectedResult = {
        type: PUSH_QUEUE_ITEM,
        item: fixture,
      };

      expect(pushQueueItem(fixture)).toEqual(expectedResult);
    });
  });
  describe('updateQueueItem', () => {
    it('should return the correct type and the passed item', () => {
      const fixture = { id: 'id', title: 'item' };
      const expectedResult = {
        type: UPDATE_QUEUE_ITEM,
        item: fixture,
      };

      expect(updateQueueItem(fixture)).toEqual(expectedResult);
    });
  });
});
