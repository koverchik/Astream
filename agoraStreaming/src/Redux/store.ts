import {authReducer} from './reducers/Auth';
import {liveReducer} from './reducers/Live';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  live: liveReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
