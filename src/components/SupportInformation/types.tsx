import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface SupportInformationState {
  readonly isOpen: boolean;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = SupportInformationState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
