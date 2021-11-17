import RtcEngine from 'react-native-agora';

import {StackNavigationPropNavigation} from '../../Home/types';

export const exitChannelHandler = (
  AgoraEngine: React.MutableRefObject<RtcEngine | undefined>,
  navigation: StackNavigationPropNavigation,
) => {
  AgoraEngine.current?.leaveChannel();
  navigation.goBack();
};
