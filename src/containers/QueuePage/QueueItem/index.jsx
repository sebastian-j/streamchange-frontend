import { connect } from 'react-redux';

import { deleteQueueItem, updateQueueItem } from '../actions';
import QueueItem from './QueueItemComponent';

function mapDispatchToProps(dispatch) {
  return {
    deleteItem: (id) => dispatch(deleteQueueItem(id)),
    updateItem: (item) => dispatch(updateQueueItem(item)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(QueueItem);
