import {getHeaderTitle} from '@react-navigation/elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {CustomHeader} from '../Components/Header';
import {Home} from '../Screens/Home';
import {Live} from '../Screens/Live';
const Stack = createStackNavigator();

export const Navigation = () => {
  const options = {headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={options}
          // TODO: You need use this fragment after create user page or notification
          // options={{
          //   headerTransparent: true,
          //   header: ({navigation, route, options, back}) => {
          //     const title = getHeaderTitle(options, route.name);
          //     return <CustomHeader  title={title} />;
          //   },
          // }}
        />
        <Stack.Screen name="Live" component={Live} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
