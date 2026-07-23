import { createStore, compose } from 'redux';
import createReducer from './reducers';

export default function configureStore(initialState = {}) {
  let composeEnhancers = compose;

  if (import.meta.env.DEV && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const store = createStore(createReducer(), initialState, composeEnhancers());

  store.injectedReducers = {};

  return store;
}
