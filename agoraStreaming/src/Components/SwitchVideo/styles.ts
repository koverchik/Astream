import {StyleSheet, ViewStyle} from 'react-native';

type SwitchVideoType = {
  wrapperView: ViewStyle;
};

export const styles = StyleSheet.create<SwitchVideoType>({
  wrapperView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
  },
});
