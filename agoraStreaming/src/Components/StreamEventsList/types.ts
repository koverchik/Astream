import {LatLng} from 'react-native-maps';
import {SharedValue} from 'react-native-reanimated';

import {StreamType} from '../../Screens/Calendar/types';

export type StreamEventListPropsType = {
  streams: StreamType[];
  geolocation: LatLng;
  translationY: SharedValue<number>;

  dataForStreamEventList?: StreamType[];
};
