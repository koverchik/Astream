import {LatLng} from 'react-native-maps';
import Animated from 'react-native-reanimated';

import {StreamType} from '../../Screens/Calendar/types';

export type StreamEventItemPropsType = {
  stream: StreamType;
  translationY: Animated.SharedValue<number>;
  index: number;
  geolocation: LatLng;
};

export enum StreamStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}
