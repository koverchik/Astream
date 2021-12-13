import React, {useEffect} from 'react';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {COLORS} from '../../Colors/colors';
import {CalendarSvg} from '../../Icons/CalendarSvg';
import {CircleSvg} from '../../Icons/CircleSvg';
import {HomeSvg} from '../../Icons/HomeSvg';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {AuthScreen} from '../../Screens/Auth';
import {getUserData} from '../../Screens/Auth/helpers/googleSignIn';
import {ScreenCalendar} from '../../Screens/Calendar';
import {ProfileScreen} from '../../Screens/Profile';
import {MainStack} from '../Stack';
import {styles} from './styles';
import {ScreenOptionsType, TabNavigation, TabParamList} from './types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabs = () => {
  const userData = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const options: BottomTabNavigationOptions = {
    headerTransparent: true,
    tabBarShowLabel: false,
    headerShown: false,
  };

  const screenOptions: ScreenOptionsType = ({route}) => ({
    tabBarIcon: ({color, size}) => {
      switch (route.name) {
        case TabNavigation.Main:
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

  const webClientId =
    '1088468777432-7titji4f8tsu0oorpqfibu469sl8jvnj.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({webClientId});
    getUserData(dispatch);
  }, []);

  if (!userData) {
    return <AuthScreen />;
  }

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
          name={TabNavigation.Profile}
          component={ProfileScreen}
          options={options}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
