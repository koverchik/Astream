import React from 'react';
import {Provider} from 'react-redux';

import {RemoteConfigService} from './src/Components/ModalCreateEvent/remoteConfigService';
import {Preloader} from './src/Components/Preloader';
import {NavigationStack} from './src/Navigation/Stack';
import {persistor, store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  RemoteConfigService.initialize();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Preloader text={'Loading ...'} />}
        persistor={persistor}>
        <NavigationStack />
      </PersistGate>
    </Provider>
  );
}
