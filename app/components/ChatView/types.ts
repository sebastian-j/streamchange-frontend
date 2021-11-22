import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IChatMessage {
  authorId: string;
  displayText: string;
  imageUrl: string;
  isModerator: boolean;
  isOwner: boolean;
  isSponsor: boolean;
  isVerified: boolean;
  publishedAt: string;
  title: string;
}

/* --- STATE --- */

interface ChatViewState {
  readonly messages: ChatMessage[];
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = ChatViewState;
type ContainerActions = AppActions;
type ChatMessage = IChatMessage;

export { ContainerState, ContainerActions, ChatMessage };
