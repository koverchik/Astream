import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

export enum TabNavigation {
  Home = 'Home',
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
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
};

export enum HeaderInputPlaceholders {
  HOME = 'Enter stream name ...',
  CALENDAR = 'Enter event name ...',
}
