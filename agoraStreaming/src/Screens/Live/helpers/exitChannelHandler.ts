import {MutableRefObject} from 'react';
import RtcEngine from 'react-native-agora';

import {StackNavigationPropLive} from '../types';

export const exitChannelHandler = (
  AgoraEngine: MutableRefObject<RtcEngine | undefined>,
  navigation: StackNavigationPropLive,
) => {
  AgoraEngine.current?.leaveChannel();
  navigation.goBack();
};
