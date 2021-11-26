import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CalendarButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
};

export const CalendarButtonStyles = (buttonsColor?: string) => {
  return StyleSheet.create<CalendarButtonStylesType>({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonsColor ?? '#007eff',
      width: 40,
      height: 25,
      borderRadius: 10,
    },
    text: {
      color: '#fff',
    },
  });
};
