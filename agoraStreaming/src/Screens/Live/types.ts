import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackScreens, RootStackParamList} from '../../Navigation/types';

export type LiveScreenProps = {
  navigation: StackNavigationPropNavigation;
  route: RouteProp<RootStackParamList, HomeStackScreens.Live>;
};

export type StackNavigationPropNavigation = StackNavigationProp<
  RootStackParamList,
  HomeStackScreens.Live
>;

export enum Members {
  Audience = 2,
  Broadcaster = 1,
}
