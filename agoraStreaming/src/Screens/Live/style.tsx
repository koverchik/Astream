import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

const {width} = Dimensions.get('window');

type LifeScreenStyles = {
  container: ViewStyle;
  camera: ViewStyle;
  wrapperVideoAndButton: ViewStyle;
  muteCamera: ViewStyle;
  userNameContainer: ViewStyle;
  iconContainer: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperVideoAndButton: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: width,
    alignItems: 'center',
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: -10,
    left: -10,
  },
});
