import {LocalUserType} from '../RemoteUsers/types';
import {Animated} from 'react-native';

export type LocalUserPropsType = {
  myUserData: LocalUserType;
  channelId: string;
  activeVoice: boolean;
  countUsers: () => number;
  sizeUserPoint: Animated.Value;
  wavesAroundUserPoint: Animated.Value;
};
