import {StyleSheet, ViewStyle} from 'react-native';

type SwitchVideoStyleTypes = {
  wrapperView: ViewStyle;
};

export const styles = StyleSheet.create<SwitchVideoStyleTypes>({
  wrapperView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
  },
});
