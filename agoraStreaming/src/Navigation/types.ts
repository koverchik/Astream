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
    name?: string;
    coords?: Region;
  };
};

export enum HomeStackScreens {
  Home = 'Home',
  Live = 'Live',
}

export type ScreenOptionsType = (props: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}) => BottomTabNavigationOptions;
