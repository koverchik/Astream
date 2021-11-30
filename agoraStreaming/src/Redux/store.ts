import {authReducer} from './reducers/Auth';
import {homeReducer} from './reducers/Home';
import {liveReducer} from './reducers/Live';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  live: liveReducer,
  home: homeReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
