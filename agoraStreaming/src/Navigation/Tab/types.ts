import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NavigationState, RouteProp} from '@react-navigation/native';

import {HomeStackScreens} from '../Stack/types';

export enum TabNavigation {
  Main = 'Main',
  Calendar = 'Calendar',
  Profile = 'Profile',
}

export type ScreenOptionsType =
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<TabParamList, keyof TabParamList>;
      navigation: TabNavigation;
    }) => BottomTabNavigationOptions);

export type TabParamList = {
  Main: undefined;
  Calendar: undefined;
  Profile: undefined;
};

export enum HeaderInputPlaceholders {
  MAIN = 'Enter stream name ...',
  CALENDAR = 'Enter event name ...',
}

export type TakeNameScreenType = (routes: NavigationState) => string;
