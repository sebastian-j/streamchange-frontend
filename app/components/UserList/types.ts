import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IUser {
  id: string;
  imageUrl: string;
  isEligible: boolean;
  isModerator: boolean;
  isSponsor: boolean | string;
  message: string;
  title: string;
}

/* --- STATE --- */

interface UserListState {
  readonly userArray: User[];
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = UserListState;
type ContainerActions = AppActions;
type User = IUser;

export { ContainerState, ContainerActions, User };
