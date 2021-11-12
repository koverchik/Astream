import {ViewStyle} from 'react-native';

export type RemoteUsersType = LocalUserType & {
  channelId: string;
  countUsers: () => number;
  cameraStyle: ViewStyle;
};

export type LocalUserType = {
  uid: number;
  userAccount: string;
  voice: boolean;
  camera: boolean;
  activeVoice: boolean;
};
