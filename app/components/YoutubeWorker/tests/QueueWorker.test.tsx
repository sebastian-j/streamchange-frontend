import React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';

import QueueWorker, { mapDispatchToProps } from '../QueueWorker';
import {
  deleteQueueItem,
  pushQueueItem,
  updateQueueItem,
} from '../../../containers/QueuePage/actions';
import { changeColor } from '../../../containers/StyleProvider/actions';

const shallowRenderer = createRenderer();
const mockStore = configureStore([]);

describe('<QueueWorker />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
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
  });
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <QueueWorker videoId="id" />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('deleteItem', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.deleteItem).toBeDefined();
      });

      it('should dispatch deleteQueueItem when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const id = 'id';
        result.deleteItem(id);
        expect(dispatch).toHaveBeenCalledWith(deleteQueueItem(id));
      });
    });

    describe('onColorChange', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onColorChange).toBeDefined();
      });

      it('should dispatch changeColor when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const col = '#00ff00';
        result.onColorChange(col);
        expect(dispatch).toHaveBeenCalledWith(changeColor(col));
      });
    });

    describe('pushItem', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.pushItem).toBeDefined();
      });

      it('should dispatch pushQueueItem when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const item = {
          id: 'id',
          addedAt: '2019-12-24T07:27:56.27-00:00',
          imageUrl: 'url',
          lastActiveAt: '2019-12-24T08:27:56.27-00:00',
          message: 'text',
          title: 'queueItem',
        };
        result.pushItem(item);
        expect(dispatch).toHaveBeenCalledWith(pushQueueItem(item));
      });
    });

    describe('updateItem', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.updateItem).toBeDefined();
      });

      it('should dispatch updateQueueItem when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const item = { id: 'id' };
        result.updateItem(item);
        expect(dispatch).toHaveBeenCalledWith(updateQueueItem(item));
      });
    });
  });
});
