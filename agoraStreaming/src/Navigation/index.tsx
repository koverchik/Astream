import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../Screens/Home';
import {Live} from '../Screens/Live';
import {HeaderApp} from '../Components/Header';
import {styles} from '../Screens/Home/style';
import {getHeaderTitle} from '@react-navigation/elements';
const Stack = createStackNavigator();

export const Navigation = () => {
  const options = {headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation, route, options, back}) => {
              const title = getHeaderTitle(options, route.name);
              return <HeaderApp title={title} />;
            },
          }}
        />
        <Stack.Screen name="Live" component={Live} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
