import {ViewStyle} from 'react-native';

export type RemoteUsersType = {
  uid: number;
  channelId: string;
  countUsers: () => number;
  userAccount: string;
  voice: boolean;
  camera: boolean;
  activeVoice: boolean;
  cameraStyle: ViewStyle;
};

export type LocalUserType = {
  uid: number;
  userAccount: string;
  voice: boolean;
  camera: boolean;
};
