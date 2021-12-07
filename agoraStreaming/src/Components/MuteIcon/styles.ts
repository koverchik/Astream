import {StyleSheet, ViewStyle} from 'react-native';

const MICROPHONE_SIZE = 20;

type MuteIconStylesType = {
  muteIcon: ViewStyle;
};

export const styles = StyleSheet.create<MuteIconStylesType>({
  muteIcon: {
    margin: 1,
    width: MICROPHONE_SIZE,
    height: MICROPHONE_SIZE,
    borderRadius: MICROPHONE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e01b4a',
  },
});
