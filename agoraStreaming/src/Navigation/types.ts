import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {Region} from 'react-native-maps';

export enum LiveType {
  CREATE = 'create',
  JOIN = 'join',
}

export type RootStackParamList = {
  Home: undefined;
  Live: {
    type: LiveType;
    channelId: string;
    video: boolean;
    name?: string;
    coords?: Region;
  };
};

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
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
