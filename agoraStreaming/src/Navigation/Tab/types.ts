import {Region} from 'react-native-maps';

import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

export enum LiveType {
  CREATE = 'create',
  JOIN = 'join',
}

export type RootStackParamList = {
  Home: undefined;
  Live: {
    type: LiveType;
    channelId: string;
    isVideo: boolean;
    name?: string;
    coords?: Region;
  };
  Profile: undefined;
};

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
}

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
