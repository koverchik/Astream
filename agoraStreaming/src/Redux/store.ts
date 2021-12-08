import {authReducer} from './reducers/Auth';
import {AuthStateType} from './reducers/Auth/types';
import {homeReducer} from './reducers/Home';
import {HomeInitialStateType} from './reducers/Home/types';
import {liveReducer} from './reducers/Live';
import {LiveInitialStateType} from './reducers/Live/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

export type RootState = {
  auth: AuthStateType;
  live: LiveInitialStateType;
  home: HomeInitialStateType;
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  live: liveReducer,
  home: homeReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  blacklist: ['live', 'home'],
};

const middlewares = [];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
