import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IChatMessage {
  authorId: string;
  color: string;
  displayText: string;
  imageUrl: string;
  isModerator: boolean;
  isStreamer: boolean;
  isSubscriber: boolean;
  isVip: boolean;
  platform: string;
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
