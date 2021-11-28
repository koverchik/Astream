import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CalendarButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
};

export const CalendarButtonStyles = (
  buttonsColor?: ViewStyle['backgroundColor'],
) => {
  return StyleSheet.create<CalendarButtonStylesType>({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonsColor ?? '#007eff',
      width: 45,
      height: 30,
      borderRadius: 10,
    },
    text: {
      color: '#fff',
    },
  });
};
