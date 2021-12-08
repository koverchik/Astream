import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Colors} from '../../../Colors/colors';

type ChangeMonthButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
};

export const ChangeMonthButtonStyles = (
  buttonColor?: ViewStyle['backgroundColor'],
) => {
  const {white, azureRadiance} = Colors;

  return StyleSheet.create<ChangeMonthButtonStylesType>({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor ?? azureRadiance,
      width: 45,
      height: 30,
      borderRadius: 10,
    },
    text: {
      color: white,
    },
  });
};
