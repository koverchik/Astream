import {Region} from 'react-native-maps';

import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';

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
  Profile = 'Profile',
}

export enum TabNavigation {
  Main = 'Main',
  Discover = 'Discover',
  Plus = 'Plus',
  Calendar = 'Calendar',
  Circle = 'Circle',
}

export type ScreenOptionsType = (props: {
  route: RouteProp<ParamListBase, string>;
  navigation: TabParamList;
}) => BottomTabNavigationOptions;

export type TabParamList = {
  Main: undefined;
  Discover: undefined;
  Plus: undefined;
  Calendar: undefined;
  Circle: undefined;
};
