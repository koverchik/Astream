export type ButtonBarPropsType = {
  exitHandler: () => void;
  cameraHandler: () => void;
  microphoneHandler: () => void;
  switchCamera: () => void;
  muteCamera: boolean;
  muteVoice: boolean;
};
