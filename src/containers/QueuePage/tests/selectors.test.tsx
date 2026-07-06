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
    const mockedState: any = {
      queue: globalState,
    };
    expect(selectQueue(mockedState)).toEqual(globalState);
  });

  it('should select the QueuePage initial state', () => {
    const mockedState: any = {};
    expect(selectQueue(mockedState)).toEqual(initialState);
  });

  it('should select the capacity', () => {
    const capacitySelector = makeSelectCapacity();
    const capacity = 10;
    const mockedState: any = {
      queue: {
        capacity,
      },
    };
    expect(capacitySelector(mockedState)).toEqual(capacity);
  });

  it('should select queue array', () => {
    const arraySelector = makeSelectQueueArray();
    const queueArray = [{ id: 'id', title: 'queueItem' }];
    const mockedState: any = {
      queue: {
        queueArray,
      },
    };
    expect(arraySelector(mockedState)).toEqual(queueArray);
  });

  it('should select queue command', () => {
    const commandSelector = makeSelectQueueCommand();
    const command = 'join';
    const mockedState: any = {
      queue: {
        command,
      },
    };
    expect(commandSelector(mockedState)).toEqual(command);
  });

  it('should select widget code', () => {
    const codeSelector = makeSelectWidgetCode();
    const widgetCode = 'code';
    const mockedState: any = {
      queue: {
        widgetCode,
      },
    };
    expect(codeSelector(mockedState)).toEqual(widgetCode);
  });

  it('should select time to mark as idle', () => {
    const timeSelector = makeSelectTTI();
    const timeToIdle = 300;
    const mockedState: any = {
      queue: {
        timeToIdle,
      },
    };
    expect(timeSelector(mockedState)).toEqual(timeToIdle);
  });

  it('should select time to kick', () => {
    const timeSelector = makeSelectTTK();
    const timeToKick = 600;
    const mockedState: any = {
      queue: {
        timeToKick,
      },
    };
    expect(timeSelector(mockedState)).toEqual(timeToKick);
  });
});
