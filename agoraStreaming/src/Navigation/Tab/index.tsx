import React from 'react';
import {Dimensions} from 'react-native';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {CalendarSvg} from '../../Icons/CalendarSvg';
import {CircleSvg} from '../../Icons/CircleSvg';
import {DiscoverSvg} from '../../Icons/DiscoverSvg';
import {HomeSvg} from '../../Icons/HomeSvg';
import {PlusSvg} from '../../Icons/PlusSvg';
import {ScreenCalendar} from '../../Screens/Calendar';
import {ProfileScreen} from '../../Screens/Profile';
import {MainStack} from '../index';
import {ScreenOptionsType, TabNavigation, TabParamList} from '../types';

const {height} = Dimensions.get('window');
const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabs = () => {
  const options: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
  };

  const screenOptions: ScreenOptionsType = ({route}) => ({
    tabBarIcon: ({color, size}) => {
      switch (route.name) {
        case TabNavigation.Main:
          return <HomeSvg color={color} size={size} />;
        case TabNavigation.Discover:
          return <DiscoverSvg color={color} size={size} />;
        case TabNavigation.Plus:
          return <PlusSvg color={color} size={size} />;
        case TabNavigation.Calendar:
          return <CalendarSvg color={color} size={size} />;
        case TabNavigation.Circle:
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
        <Tab.Screen
          name={TabNavigation.Main}
          component={MainStack}
          options={options}
        />
        {/* // TODO: hide element for demo*/}
        {/*<Tab.Screen
          name={TabNavigation.Discover}
          component={ScreenCalendar}
          options={options}
        />
        <Tab.Screen
          name={TabNavigation.Plus}
          component={ScreenCalendar}
          options={options}
        />*/}
        <Tab.Screen
          name={TabNavigation.Calendar}
          component={ScreenCalendar}
          options={options}
        />
        <Tab.Screen
          name={TabNavigation.Circle}
          component={ProfileScreen}
          options={options}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
