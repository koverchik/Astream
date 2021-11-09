import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

const {width} = Dimensions.get('window');

const MicroSize = 20;

type LifeScreenStyles = {
  container: ViewStyle;
  loadingText: TextStyle;
  camera: ViewStyle;
  muteCamera: ViewStyle;
  userNameContainer: ViewStyle;
  microMuteIcon: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: width,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
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
  microMuteIcon: {
    position: 'absolute',
    bottom: -7,
    left: -10,
    width: MicroSize,
    height: MicroSize,
    borderRadius: MicroSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e01b4a',
  },
});
