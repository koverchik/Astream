import React from 'react';

import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import {Home} from '../../Screens/Home';
import {Live} from '../../Screens/Live';
import {HomeStackScreens, RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const options: StackNavigationOptions = {headerShown: false};

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeStackScreens.Home}
        component={Home}
        options={options}
      />
      <Stack.Screen
        name={HomeStackScreens.Live}
        component={Live}
        options={options}
      />
    </Stack.Navigator>
  );
};
