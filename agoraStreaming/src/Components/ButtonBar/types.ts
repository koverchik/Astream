import {RootStackParamList} from '../../Navigation/Tab/types';

export type ButtonBarPropsType = {
  exitHandler: () => void;
  cameraHandler: () => void;
  microphoneHandler: () => void;
  switchCamera: () => void;
  muteCamera: boolean;
  muteVoice: boolean;
  isVideo: RootStackParamList['Live']['isVideo'];
};
