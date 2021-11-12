import RtcEngine from 'react-native-agora';

export const switchCamera = (
  AgoraEngine: React.MutableRefObject<RtcEngine | undefined>,
) => {
  AgoraEngine.current?.switchCamera();
};
