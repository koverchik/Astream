import {LatLng, Region} from 'react-native-maps';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../Navigation/Stack/types';
import {TabNavigation, TabParamList} from '../../Navigation/Tab/types';

export type HomeScreenProps = {
  navigation: TabNavigationPropHomeType;
  route: RouteProp<TabParamList, TabNavigation.Home>;
};

export type TabNavigationPropHomeType = BottomTabNavigationProp<
  TabParamList,
  TabNavigation.Home
>;

export type ListChannelsType = {
  name: string;
  coords: LatLng | Region;
  channelId: string;
  isVideo: RootStackParamList['Live']['isVideo'];
  calloutIsShow: boolean;
};

export type ChannelFromFirebaseType = Pick<
  ListChannelsType,
  'channelId' | 'isVideo' | 'coords' | 'name'
>;

export type DataForCloseChannelType = Pick<
  ListChannelsType,
  'channelId' | 'isVideo'
>;
