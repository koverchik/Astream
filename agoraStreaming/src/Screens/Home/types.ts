import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Region} from 'react-native-maps';
import {HomeStackScreens, RootStackParamList} from '../../Navigation/types';

export type HomeScreenProps = {
  navigation: StackNavigationPropNavigation;
  route: RouteProp<RootStackParamList, HomeStackScreens.Home>;
};

export type StackNavigationPropNavigation = StackNavigationProp<
  RootStackParamList,
  HomeStackScreens.Home
>;

export type ListChannelsType = {
  name: string;
  coords: Region;
  channel: string;
};
