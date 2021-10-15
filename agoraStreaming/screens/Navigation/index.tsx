import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../Home';
import {Live} from '../Live';

const Stack = createStackNavigator();

export const Navigation = () => {
  const options = {headerShown: false};
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={options} />
        <Stack.Screen name="Live" component={Live} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
