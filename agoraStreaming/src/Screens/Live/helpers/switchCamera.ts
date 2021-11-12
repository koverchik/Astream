import {MutableRefObject} from 'react';
import RtcEngine from 'react-native-agora';

export const switchCamera = (
  AgoraEngine: MutableRefObject<RtcEngine | undefined>,
) => {
  AgoraEngine.current?.switchCamera();
};
