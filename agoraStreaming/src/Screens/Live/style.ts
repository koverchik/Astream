import {ScaledSize, StyleSheet, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';

export type LifeScreenStylesType = {
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

export const LiveStyles = (width: ScaledSize['width']) => {
  const {black} = Colors;

  return StyleSheet.create<LifeScreenStylesType>({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    videoContainer: {
      flex: 1,
      width,
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
      backgroundColor: black,
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
};
