import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IFilteringOptions {
  moderators: boolean;
  sponsors: boolean;
  verified: boolean;
  regulars: boolean;
  participating: boolean;
  notParticipating: boolean;
}

interface IUser {
  id: string;
  imageUrl: string;
  isEligible: boolean;
  isModerator: boolean;
  isSponsor: boolean | string;
  isVerified: boolean;
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
type FilteringOptions = IFilteringOptions;
type User = IUser;

export { ContainerState, ContainerActions, FilteringOptions, User };
