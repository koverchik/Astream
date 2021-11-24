import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackScreens, RootStackParamList} from '../../Navigation/Tab/types';

export type ProfileScreenProps = {
  navigation: StackNavigationPropProfile;
  route: RouteProp<RootStackParamList, HomeStackScreens.Profile>;
};

export type StackNavigationPropProfile = StackNavigationProp<
  RootStackParamList,
  HomeStackScreens.Profile
>;
