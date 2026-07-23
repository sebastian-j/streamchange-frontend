import { connect } from 'react-redux';

import { addMessage } from '../ChatView/actions';
import { changeColor } from '../../containers/StyleProvider/actions';
import {
  deleteQueueItem,
  pushQueueItem,
  updateQueueItem,
} from '../../containers/QueuePage/actions';
import QueueWorker from './QueueWorkerComponent';

export function mapDispatchToProps(dispatch) {
  return {
    addMessage: (m) => dispatch(addMessage(m)),
    deleteItem: (id) => dispatch(deleteQueueItem(id)),
    onColorChange: (col) => dispatch(changeColor(col)),
    pushItem: (item) => dispatch(pushQueueItem(item)),
    updateItem: (item) => dispatch(updateQueueItem(item)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(QueueWorker);
