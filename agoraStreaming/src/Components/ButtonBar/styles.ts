import {StyleSheet, ViewStyle} from 'react-native';

type ButtonBarStylesType = {
  buttonBar: ViewStyle;
};

export const styles = StyleSheet.create<ButtonBarStylesType>({
  buttonBar: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
