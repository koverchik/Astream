import {Region} from 'react-native-maps';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  HomeStackScreens,
  RootStackParamList,
} from '../../Navigation/Stack/types';

export type HomeScreenProps = {
  navigation: StackNavigationPropHome;
  route: RouteProp<RootStackParamList, HomeStackScreens.Home>;
};

export type StackNavigationPropHome = StackNavigationProp<
  RootStackParamList,
  HomeStackScreens.Home
>;

export type ListChannelsType = {
  name: string;
  coords: Region;
  channelId: string;
  isVideo: RootStackParamList['Live']['isVideo'];
  calloutIsShow: boolean;
};

export type ChannelsListFromFirebase = Pick<
  ListChannelsType,
  'channelId' | 'isVideo' | 'coords' | 'name'
>;
