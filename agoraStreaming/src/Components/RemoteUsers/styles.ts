import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';

const MICRO_SIZE = 20;

type LifeScreenStyles = {
  camera: ViewStyle;
  userNameContainer: ViewStyle;
  muteCamera: ViewStyle;
  iconContainer: ViewStyle;
  muteIcon: ViewStyle;
  rtcRemote: ViewStyle;
};

const {BLACK, CERISE_RED} = COLORS;

export const styles = StyleSheet.create<LifeScreenStyles>({
  camera: {
    flex: 1,
  },
  rtcRemote: {
    width: '100%',
    height: '100%',
  },
  muteCamera: {
    backgroundColor: BLACK,
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
    backgroundColor: CERISE_RED,
  },
});
