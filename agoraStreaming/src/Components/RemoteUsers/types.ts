import {ViewStyle} from 'react-native';

export type RemoteUserType = LocalUserType & {
  index: number;
  channelId: string;
  countUsers: number;
  cameraStyle: ViewStyle;
};

export type LocalUserType = {
  uid: number;
  userAccount: string;
  voice: boolean;
  camera: boolean;
  activeVoice: boolean;
  isVideo: boolean;
};
