import {StyleSheet, Dimensions, ViewStyle} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const MicroSize = 20;

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
    width: dimensions.width,
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
  muteIcon: {
    margin: 1,
    width: MicroSize,
    height: MicroSize,
    borderRadius: MicroSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e01b4a',
  },
});
