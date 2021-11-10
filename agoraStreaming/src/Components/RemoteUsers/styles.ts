import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const MicroSize = 20;

type LifeScreenStyles = {
  container: ViewStyle;
  loadingText: TextStyle;
  localScreen: ViewStyle;
  camera: ViewStyle;
  userNameContainer: ViewStyle;
  muteCamera: ViewStyle;
  iconContainer: ViewStyle;
  muteIcon: ViewStyle;
  userScreen: ViewStyle;
  userContainer: ViewStyle;
  localContainer: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localContainer: {
    flex: 1,
    width: '100%',
  },
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
  localScreen: {
    flex: 1,
    width: '100%',
  },
  userContainer: {
    flex: 1,
    width: '100%',
  },
  userScreen: {
    flex: 1,
    width: '100%',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
});
