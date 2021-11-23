import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';

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
