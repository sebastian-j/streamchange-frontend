import {
  selectQueue,
  makeSelectCapacity,
  makeSelectQueueArray,
  makeSelectQueueCommand,
  makeSelectWidgetCode,
  makeSelectTTI,
  makeSelectTTK,
} from '../selectors';
import { initialState } from '../reducer';

describe('QueuePage selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      queue: globalState,
    };
    expect(selectQueue(mockedState)).toEqual(globalState);
  });

  it('should select the QueuePage initial state', () => {
    const mockedState = {};
    expect(selectQueue(mockedState)).toEqual(initialState);
  });

  it('should select the capacity', () => {
    const capacitySelector = makeSelectCapacity();
    const capacity = 10;
    const mockedState = {
      queue: {
        capacity,
      },
    };
    expect(capacitySelector(mockedState)).toEqual(capacity);
  });

  it('should select queue array', () => {
    const arraySelector = makeSelectQueueArray();
    const queueArray = [{ id: 'id', title: 'queueItem' }];
    const mockedState = {
      queue: {
        queueArray,
      },
    };
    expect(arraySelector(mockedState)).toEqual(queueArray);
  });

  it('should select queue command', () => {
    const commandSelector = makeSelectQueueCommand();
    const command = 'join';
    const mockedState = {
      queue: {
        command,
      },
    };
    expect(commandSelector(mockedState)).toEqual(command);
  });

  it('should select widget code', () => {
    const codeSelector = makeSelectWidgetCode();
    const widgetCode = 'code';
    const mockedState = {
      queue: {
        widgetCode,
      },
    };
    expect(codeSelector(mockedState)).toEqual(widgetCode);
  });

  it('should select time to mark as idle', () => {
    const timeSelector = makeSelectTTI();
    const timeToIdle = 300;
    const mockedState = {
      queue: {
        timeToIdle,
      },
    };
    expect(timeSelector(mockedState)).toEqual(timeToIdle);
  });

  it('should select time to kick', () => {
    const timeSelector = makeSelectTTK();
    const timeToKick = 600;
    const mockedState = {
      queue: {
        timeToKick,
      },
    };
    expect(timeSelector(mockedState)).toEqual(timeToKick);
  });
});
