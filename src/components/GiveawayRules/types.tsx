import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { User } from '../UserList/types';

/* --- STATE --- */

interface GiveawayRulesState {
  readonly keyword: string;
  readonly preWinner: User | null;
  readonly prize: string;
  readonly requirement: number;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = GiveawayRulesState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
