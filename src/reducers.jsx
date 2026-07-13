/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
//import { connectRouter } from 'connected-react-router';
import giveawayRulesReducer from './components/GiveawayRules/reducer';
import giveawayPageReducer from './containers/GiveawayPage/reducer';
import languageProviderReducer from './containers/LanguageProvider/reducer';
import styleProviderReducer from '../src/containers/StyleProvider/reducer';
import raffleWrapperReducer from '../src/components/RaffleWrapper/reducer';
import queueReducer from './containers/QueuePage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {


  return combineReducers({
    language: languageProviderReducer,
    theme: styleProviderReducer,
    raffleWrapper: raffleWrapperReducer,
    giveawayPage: giveawayPageReducer,
    queue: queueReducer,
    giveawayRules: giveawayRulesReducer,
    //router: connectRouter(history),
    ...injectedReducers,
  });
}
