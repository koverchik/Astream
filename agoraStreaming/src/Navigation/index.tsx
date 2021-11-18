import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {Home} from '../Screens/Home';
import {Live} from '../Screens/Live';

const Stack = createStackNavigator();

export const MainStack = () => {
  const options = {headerShown: false};

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={options} />
      <Stack.Screen name="Live" component={Live} options={options} />
    </Stack.Navigator>
  );
};
