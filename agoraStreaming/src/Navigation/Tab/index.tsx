import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {CalendarSvg} from '../../Icons/CalendarSvg';
import {CircleSvg} from '../../Icons/CircleSvg';
import {DiscoverSvg} from '../../Icons/DiscoverSvg';
import {HomeSvg} from '../../Icons/HomeSvg';
import {PlusSvg} from '../../Icons/PlusSvg';
import {setUser} from '../../Redux/actions/AuthActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {AuthScreen} from '../../Screens/Auth';
import {ScreenCalendar} from '../../Screens/Calendar';
import {MainStack} from '../Stack';
import {styles} from './styles';
import {ScreenOptionsType, TabNavigation, TabParamList} from './types';

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
    tabBarStyle: styles.tabBar,
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onAuthStateChanged = (userInfo: FirebaseAuthTypes.User | null) => {
    if (userInfo) {
      const {uid, email, displayName} = userInfo;
      dispatch(setUser({displayName, uid, email}));
    }
  };

  const webClientId =
    '1088468777432-7titji4f8tsu0oorpqfibu469sl8jvnj.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({webClientId});
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (!user) {
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
        <Tab.Screen
          name={TabNavigation.Discover}
          component={ScreenCalendar}
          options={options}
        />
        <Tab.Screen
          name={TabNavigation.Plus}
          component={ScreenCalendar}
          options={options}
        />
        <Tab.Screen
          name={TabNavigation.Calendar}
          component={ScreenCalendar}
          options={options}
        />
        <Tab.Screen
          name={TabNavigation.Circle}
          component={ScreenCalendar}
          options={options}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
