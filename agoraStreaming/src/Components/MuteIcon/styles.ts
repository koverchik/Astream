import {StyleSheet, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';

type MuteIconStylesType = {
  muteIcon: ViewStyle;
};

const MICROPHONE_SIZE = 20;

export const styles = StyleSheet.create<MuteIconStylesType>({
  muteIcon: {
    margin: 1,
    width: MICROPHONE_SIZE,
    height: MICROPHONE_SIZE,
    borderRadius: MICROPHONE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ceriseRed,
  },
});
