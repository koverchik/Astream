import {MutableRefObject} from 'react';
import RtcEngine from 'react-native-agora';
import {StackNavigationPropNavigation} from '../../Screens/Live/types';

export type ButtonBarPropsType = {
  exitHandler: (
    AgoraEngine: MutableRefObject<RtcEngine | undefined>,
    navigation: StackNavigationPropNavigation,
  ) => void;
  cameraHandler: () => void;
  microphoneHandler: () => void;
  switchCamera: (AgoraEngine: MutableRefObject<RtcEngine | undefined>) => void;
  muteCamera: boolean;
  muteVoice: boolean;
};
