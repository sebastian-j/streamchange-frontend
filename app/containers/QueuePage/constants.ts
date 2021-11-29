/*
 *
 * QueuePage constants
 *
 */
enum ActionTypes {
  CHANGE_QUEUE_COMMAND = 'app/QueuePage/CHANGE_QUEUE_COMMAND',
  CHANGE_QUEUE_CAPACITY = 'app/QueuePage/CHANGE_QUEUE_CAPACITY',
  CHANGE_QUEUE_TTI = 'app/QueuePage/CHANGE_QUEUE_TTI',
  CHANGE_QUEUE_TTK = 'app/QueuePage/CHANGE_QUEUE_TTK',
  CHANGE_QUEUE_WIDGET_CODE = 'app/QueuePage/CHANGE_QUEUE_WIDGET_CODE',
  DELETE_QUEUE_ITEM = 'app/QueuePage/DELETE_QUEUE_ITEM',
  GET_QUEUE_FROM_DB = 'app/QueuePage/GET_QUEUE_FROM_DB',
  PURGE_QUEUE = 'app/QueuePage/PURGE_QUEUE',
  PUSH_QUEUE_ITEM = 'app/QueuePage/PUSH_QUEUE_ITEM',
  UPDATE_QUEUE_ITEM = 'app/QueuePage/UPDATE_QUEUE_ITEM',
}

export default ActionTypes;
