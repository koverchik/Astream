import {StyleSheet, Dimensions, ViewStyle} from 'react-native';

const {width} = Dimensions.get('window');

type LifeScreenStyles = {
  container: ViewStyle;
  camera: ViewStyle;
  muteCamera: ViewStyle;
  userNameContainer: ViewStyle;
  iconContainer: ViewStyle;
  videoContainer: ViewStyle;
  rtcLocal: ViewStyle;
  row: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoContainer: {
    width: width,
    height: '60%',
    backgroundColor: '#92abe1',
  },
  camera: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: -10,
    left: -10,
  },
});
