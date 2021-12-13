import React from 'react';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {COLORS} from '../../Colors/colors';
import {CalendarSvg} from '../../Icons/CalendarSvg';
import {CircleSvg} from '../../Icons/CircleSvg';
import {HomeSvg} from '../../Icons/HomeSvg';
import {ScreenCalendar} from '../../Screens/Calendar';
import {Home} from '../../Screens/Home';
import {ProfileScreen} from '../../Screens/Profile';
import {styles} from '../Stack/styles';
import {ScreenOptionsType, TabNavigation, TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export const MainTab = () => {
  const options: BottomTabNavigationOptions = {
    headerTransparent: true,
    tabBarShowLabel: false,
    headerShown: false,
  };

  const screenOptions: ScreenOptionsType = ({route}) => ({
    tabBarIcon: ({color, size}) => {
      switch (route.name) {
        case TabNavigation.Home:
          return <HomeSvg color={color} size={size} />;
        // TODO: hide icons for demo
        // case TabNavigation.Discover:
        //   return <DiscoverSvg color={color} size={size} />;
        // case TabNavigation.Plus:
        //   return <PlusSvg color={color} size={size} />;
        case TabNavigation.Calendar:
          return <CalendarSvg color={color} size={size} />;
        case TabNavigation.Profile:
          return <CircleSvg color={color} size={size} />;
      }
    },
    tabBarActiveTintColor: COLORS.CERULEAN,
    tabBarInactiveTintColor: COLORS.WHITE,
    tabBarStyle: styles.tabBar,
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={TabNavigation.Home}
        component={Home}
        options={options}
      />
      {/* // TODO: hide element for demo*/}
      {/*<Stack.Screen
          name={TabNavigation.Discover}
          component={ScreenCalendar}
          options={options}
        />
        <Stack.Screen
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
        name={TabNavigation.Profile}
        component={ProfileScreen}
        options={options}
      />
    </Tab.Navigator>
  );
};
