import {StyleSheet, Dimensions, ViewStyle} from 'react-native';

const {width} = Dimensions.get('window');

type LifeScreenStyles = {
  container: ViewStyle;
  camera_1: ViewStyle;
  camera_2: ViewStyle;
  camera_3: ViewStyle;
  muteCamera: ViewStyle;
  userNameContainer: ViewStyle;
  iconContainer: ViewStyle;
  videoContainer: ViewStyle;
  rtcLocal: ViewStyle;
  row: ViewStyle;
  column: ViewStyle;
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
  camera_1: {
    flex: 1,
  },
  camera_2: {
    width: width,
    height: '50%',
  },
  camera_3: {
    width: '50%',
    height: '50%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
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
