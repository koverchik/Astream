import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {Calendar} from '../../Screens/Calendar';
import {MainStack} from '../index';
import {Dimensions} from 'react-native';
import {HomeSvg} from '../../Icons/HomeSvg';
import {CalendarSvg} from '../../Icons/CalendarSvg';
import {CircleSvg} from '../../Icons/CircleSvg';
import {PlusSvg} from '../../Icons/PlusSvg';
import {DiscoverSvg} from '../../Icons/DiscoverSvg';

const {height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

type ScreenOptionsType = (props: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}) => BottomTabNavigationOptions;

export const BottomTabs = () => {
  const options: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
  };

  const screenOptions: ScreenOptionsType = ({route}) => ({
    tabBarIcon: ({color, size}) => {
      switch (route.name) {
        case 'Main':
          return <HomeSvg color={color} size={size} />;
        case 'Discover':
          return <DiscoverSvg color={color} size={size} />;
        case 'Plus':
          return <PlusSvg color={color} size={size} />;
        case 'Calendar':
          return <CalendarSvg color={color} size={size} />;
        case 'Circle':
          return <CircleSvg color={color} size={size} />;
      }
    },
    tabBarActiveTintColor: '#38a1e3',
    tabBarInactiveTintColor: '#fff',
    tabBarStyle: {
      borderTopColor: '#000',
      height: height * 0.1,
      backgroundColor: '#000',
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Main" component={MainStack} options={options} />
        <Tab.Screen name="Discover" component={Calendar} options={options} />
        <Tab.Screen name="Plus" component={Calendar} options={options} />
        <Tab.Screen name="Calendar" component={Calendar} options={options} />
        <Tab.Screen name="Circle" component={Calendar} options={options} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
