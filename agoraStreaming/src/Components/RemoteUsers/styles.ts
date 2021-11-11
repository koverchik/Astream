import {StyleSheet, Dimensions, ViewStyle} from 'react-native';

const MICRO_SIZE = 20;

type LifeScreenStyles = {
  camera: ViewStyle;
  userNameContainer: ViewStyle;
  muteCamera: ViewStyle;
  iconContainer: ViewStyle;
  muteIcon: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  camera: {
    flex: 1,
    backgroundColor: '#178',
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
  muteIcon: {
    margin: 1,
    width: MICRO_SIZE,
    height: MICRO_SIZE,
    borderRadius: MICRO_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e01b4a',
  },
});
