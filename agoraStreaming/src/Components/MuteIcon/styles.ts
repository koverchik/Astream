import {StyleSheet, ViewStyle} from 'react-native';

const MicroSize = 20;

type MuteIconStylesType = {
  muteIcon: ViewStyle;
};

export const styles = StyleSheet.create<MuteIconStylesType>({
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
