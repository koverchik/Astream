import {StyleSheet, Dimensions, ViewStyle} from 'react-native';

const {width} = Dimensions.get('window');

type LifeScreenStyles = {
  container: ViewStyle;
  cameraFullScreen: ViewStyle;
  cameraTwoUsers: ViewStyle;
  defaultCamera: ViewStyle;
  muteCamera: ViewStyle;
  userNameContainer: ViewStyle;
  iconContainer: ViewStyle;
  videoContainer: ViewStyle;
  row: ViewStyle;
  column: ViewStyle;
};

const POSITION_OFFSET = 20;

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoContainer: {
    width,
    height: '60%',
    backgroundColor: '#92abe1',
  },
  cameraFullScreen: {
    flex: 1,
  },
  cameraTwoUsers: {
    width,
    height: '50%',
  },
  defaultCamera: {
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
  muteCamera: {
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  userNameContainer: {
    position: 'absolute',
    top: POSITION_OFFSET,
    left: POSITION_OFFSET,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: -POSITION_OFFSET / 2,
    left: -POSITION_OFFSET / 2,
  },
});
