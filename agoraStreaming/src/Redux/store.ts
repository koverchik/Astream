import {authReducer} from './reducers/Auth';
import {AuthReduserType} from './reducers/Auth/types';
import {homeReducer} from './reducers/Home';
import {HomeReduserType} from './reducers/Home/types';
import {liveReducer} from './reducers/Live';
import {LiveReduserType} from './reducers/Live/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

const rootReducer = combineReducers<
  AuthReduserType | HomeReduserType | LiveReduserType
>({
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
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
