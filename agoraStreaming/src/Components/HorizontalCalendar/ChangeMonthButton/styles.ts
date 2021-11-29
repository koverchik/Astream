import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ChangeMonthButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
};

export const ChangeMonthButtonStyles = (
  buttonColor?: ViewStyle['backgroundColor'],
) => {
  return StyleSheet.create<ChangeMonthButtonStylesType>({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor ?? '#007eff',
      width: 45,
      height: 30,
      borderRadius: 10,
    },
    text: {
      color: '#fff',
    },
  });
};
