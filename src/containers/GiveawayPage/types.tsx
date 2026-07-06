import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IBan {
  channelId: string,
  description: string,
  endsAt: string,
}

interface IStream {
  ownerId: string;
  thumbnailUrl: string;
  title: string;
  videoId: string;
}

type Ban = IBan;
type Stream = IStream;

/* --- STATE --- */

interface GiveawayState {
  readonly authKey: string;
  readonly ban: Ban | null;
  readonly stream: Stream;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = GiveawayState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions, Ban, Stream };
