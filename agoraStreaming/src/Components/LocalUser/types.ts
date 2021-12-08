import {Animated, ViewStyle} from 'react-native';

import {LocalUserType} from '../RemoteUsers/types';

export type LocalUserPropsType = {
  index: number;
  myUserData: LocalUserType;
  channelId: string;
  activeVoice: boolean;
  countUsers: number;
  sizeUserPoint: Animated.Value;
  wavesAroundUserPoint: Animated.Value;
  cameraSize: ViewStyle;
  isVideo: boolean;
};
