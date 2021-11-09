import {Animated} from 'react-native';

export type IconUserNameType = {
  userName: string;
  countUser: () => number;
  sizeUserPoint: Animated.Value;
  wavesAroundUserPoint: Animated.Value;
};
