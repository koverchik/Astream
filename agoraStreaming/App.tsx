import React from 'react';
import {Provider} from 'react-redux';

import {Preloader} from './src/Components/Preloader';
import {BottomTabs} from './src/Navigation/Tab';
import {persistor, store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Preloader text={'Loading ...'} />}
        persistor={persistor}>
        <BottomTabs />
      </PersistGate>
    </Provider>
  );
}
