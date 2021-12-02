import React from 'react';
import {Provider} from 'react-redux';

import {BottomTabs} from './src/Navigation/Tab';
import {persistor, store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BottomTabs />
      </PersistGate>
    </Provider>
  );
}
