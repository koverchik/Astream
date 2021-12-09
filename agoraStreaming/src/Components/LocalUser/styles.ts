import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';

type LifeScreenStyles = {
  camera: ViewStyle;
  muteCamera: ViewStyle;
  userNameContainer: ViewStyle;
  rtcLocal: ViewStyle;
};

const POSITION_OFFSET = 20;

export const styles = StyleSheet.create<LifeScreenStyles>({
  camera: {
    flex: 1,
  },
  rtcLocal: {
    width: '100%',
    height: '100%',
  },
  muteCamera: {
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
  },
  userNameContainer: {
    position: 'absolute',
    top: POSITION_OFFSET,
    left: POSITION_OFFSET,
  },
});
