import { action } from 'typesafe-actions';
import ActionTypes from '../constants';

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
      const expectedResult = action(ActionTypes.CHANGE_QUEUE_COMMAND, fixture);

      expect(changeQueueCommand(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeCapacity', () => {
    it('should return the correct type and the passed capacity', () => {
      const fixture = 10;
      const expectedResult = action(ActionTypes.CHANGE_QUEUE_CAPACITY, fixture);

      expect(changeCapacity(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeQueueTTI', () => {
    it('should return the correct type and the passed integer', () => {
      const fixture = 300;
      const expectedResult = action(ActionTypes.CHANGE_QUEUE_TTI, fixture);

      expect(changeTTI(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeQueueTTK', () => {
    it('should return the correct type and the passed integer', () => {
      const fixture = 300;
      const expectedResult = action(ActionTypes.CHANGE_QUEUE_TTK, fixture);

      expect(changeTTK(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeQueueWidgetCode', () => {
    it('should return the correct type and the passed code', () => {
      const fixture = 'code';
      const expectedResult = action(
        ActionTypes.CHANGE_QUEUE_WIDGET_CODE,
        fixture,
      );

      expect(changeWidgetCode(fixture)).toEqual(expectedResult);
    });
  });
  describe('deleteQueueItem', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = 'id';
      const expectedResult = action(ActionTypes.DELETE_QUEUE_ITEM, fixture);

      expect(deleteQueueItem(fixture)).toEqual(expectedResult);
    });
  });
  describe('getQueueItemFromIDB', () => {
    it('should return the correct type and the passed array', () => {
      const fixture = [
        {
          id: 'id',
          addedAt: '2019-12-24T07:27:56.27-00:00',
          imageUrl: 'url',
          lastActiveAt: '2019-12-24T08:27:56.27-00:00',
          message: 'text',
          title: 'queueItem',
        },
      ];
      const expectedResult = action(ActionTypes.GET_QUEUE_FROM_DB, fixture);

      expect(getQueueFromIdb(fixture)).toEqual(expectedResult);
    });
  });
  describe('purgeQueue', () => {
    it('should return the correct type', () => {
      const expectedResult = action(ActionTypes.PURGE_QUEUE);

      expect(purgeQueue()).toEqual(expectedResult);
    });
  });
  describe('pushQueueItem', () => {
    it('should return the correct type and the passed item', () => {
      const fixture = {
        id: 'id',
        addedAt: '2019-12-24T07:27:56.27-00:00',
        imageUrl: 'url',
        lastActiveAt: '2019-12-24T08:27:56.27-00:00',
        message: 'text',
        title: 'item',
      };
      const expectedResult = action(ActionTypes.PUSH_QUEUE_ITEM, fixture);

      expect(pushQueueItem(fixture)).toEqual(expectedResult);
    });
  });
  describe('updateQueueItem', () => {
    it('should return the correct type and the passed item', () => {
      const fixture = { id: 'id', title: 'item' };
      const expectedResult = action(ActionTypes.UPDATE_QUEUE_ITEM, fixture);

      expect(updateQueueItem(fixture)).toEqual(expectedResult);
    });
  });
});
