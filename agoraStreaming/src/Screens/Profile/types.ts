import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackScreens, RootStackParamList} from '../../Navigation/types';

export type ProfileScreenProps = {
  navigation: StackNavigationPropNavigation;
  route: RouteProp<RootStackParamList, HomeStackScreens.Profile>;
};

export type StackNavigationPropNavigation = StackNavigationProp<
  RootStackParamList,
  HomeStackScreens.Profile
>;
