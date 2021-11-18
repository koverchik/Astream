import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {Home} from '../Screens/Home';
import {Live} from '../Screens/Live';

const Stack = createStackNavigator();

export const MainStack = () => {
  const options = {headerShown: false};

  return (
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
  );
};
