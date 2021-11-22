import React from 'react';
import {Provider} from 'react-redux';

import {BottomTabs} from './src/Navigation/Tab';
import {store} from './src/Redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <BottomTabs />
    </Provider>
  );
}
