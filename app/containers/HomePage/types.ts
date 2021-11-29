import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface HomeState {
  readonly ownerId: string;
  readonly thumbnailUrl: string;
  readonly title: string;
  readonly videoId: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = HomeState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
