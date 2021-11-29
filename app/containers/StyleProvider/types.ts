import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface StyleProviderState {
  readonly color: string;
  readonly isDarkMode: boolean;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = StyleProviderState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
