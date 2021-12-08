import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  HomeStackScreens,
  RootStackParamList,
} from '../../Navigation/Stack/types';

export type LiveScreenProps = {
  navigation: StackNavigationPropLive;
  route: RouteProp<RootStackParamList, HomeStackScreens.Live>;
};

export type StackNavigationPropLive = StackNavigationProp<
  RootStackParamList,
  HomeStackScreens.Live
>;

export enum Members {
  Audience = 2,
  Broadcaster = 1,
}

export type UserType = {
  userAccount: string;
  uid: number;
  camera: boolean;
  voice: boolean;
  activeVoice: boolean;
};

export type MuteSettingsType = {
  uid: number;
  muted: boolean;
  device: Devices;
};

export enum Devices {
  VOICE = 'voice',
  CAMERA = 'camera',
}
