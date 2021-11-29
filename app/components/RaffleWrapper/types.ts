import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface RaffleWrapperState {
  readonly animationType: number;
  readonly animationDuration: number;
  readonly isOpen: boolean;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = RaffleWrapperState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
