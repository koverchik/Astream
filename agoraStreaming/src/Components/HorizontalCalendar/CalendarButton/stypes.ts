import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CalendarButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
};

export const styles = StyleSheet.create<CalendarButtonStylesType>({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007eff',
    width: 40,
    height: 25,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
  },
});
