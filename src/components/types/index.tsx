import { Reducer, Store } from 'redux';

import { ContainerState as LanguageProviderState } from '../../containers/LanguageProvider/types';
import { ContainerState as GiveawayState } from '../../containers/GiveawayPage/types';
import { ContainerState as StyleProviderState } from '../../containers/StyleProvider/types';
import { ContainerState as QueueState } from '../../containers/QueuePage/types';
import { ContainerState as ChatViewState } from '../../components/ChatView/types';
import { ContainerState as RaffleWrapperState } from '../../components/RaffleWrapper/types';
import { ContainerState as GiveawayRulesState } from '../../components/GiveawayRules/types';
import { ContainerState as SupportInformationState } from '../../components/SupportInformation/types';
import { ContainerState as UserListState } from '../../components/UserList/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface InjectedStore extends Store {
  injectedReducers: any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly language: LanguageProviderState;
  readonly theme: StyleProviderState;
  readonly raffleWrapper: RaffleWrapperState;
  readonly giveawayPage: GiveawayState;
  readonly queue: QueueState;
  readonly giveawayRules: GiveawayRulesState;
  readonly supportInfo?: SupportInformationState;
  readonly chat?: ChatViewState;
  readonly userList?: UserListState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly

  // for testing purposes
  // readonly test: any;
}
