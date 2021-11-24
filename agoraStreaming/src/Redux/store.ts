import {authReducer} from './reducers/Auth';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
