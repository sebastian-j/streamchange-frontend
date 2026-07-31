import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IStream {
  ownerId: string;
  title: string;
  videoId: string;
}

type Stream = IStream;

/* --- STATE --- */

interface GiveawayState {
  readonly stream: Stream;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = GiveawayState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions, Stream };
