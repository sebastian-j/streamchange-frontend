import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IQueueItem {
  addedAt: string;
  id: string;
  imageUrl: string;
  lastActiveAt: string;
  message: string;
  title: string;
}

/* --- STATE --- */

interface QueueState {
  readonly capacity: number;
  readonly command: string;
  readonly queueArray: QueueItem[];
  readonly timeToIdle: number;
  readonly timeToKick: number;
  readonly widgetCode: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = QueueState;
type ContainerActions = AppActions;
type QueueItem = IQueueItem;

export { ContainerState, ContainerActions };
