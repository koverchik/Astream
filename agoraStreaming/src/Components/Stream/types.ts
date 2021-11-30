import Animated from 'react-native-reanimated';

import {StreamType} from '../../Screens/Calendar/types';

export type StreamPropsType = {
  stream: StreamType;
  translationY: Animated.SharedValue<number>;
  index: number;
};
