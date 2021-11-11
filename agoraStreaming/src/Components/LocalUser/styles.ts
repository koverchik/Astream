import {StyleSheet, ViewStyle} from 'react-native';

type LifeScreenStyles = {
  camera: ViewStyle;
  muteCamera: ViewStyle;
  userNameContainer: ViewStyle;
  rtcLocal: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  camera: {
    flex: 1,
  },
  rtcLocal: {
    width: '100%',
    height: '100%',
  },
  muteCamera: {
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  userNameContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
