import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

interface IChatMessage {
  authorId: string;
  badges: string[];
  color: string;
  displayText: string;
  imageUrl: string;
  isStreamer: boolean;
  isSubscriber: boolean;
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
