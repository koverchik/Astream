import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../../Colors/colors';

type ChangeMonthButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
};

export const ChangeMonthButtonStyles = (
  buttonColor?: ViewStyle['backgroundColor'],
) => {
  const {WHITE, AZURE_RADIANCE} = COLORS;

  return StyleSheet.create<ChangeMonthButtonStylesType>({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor ?? AZURE_RADIANCE,
      width: 45,
      height: 30,
      borderRadius: 10,
    },
    text: {
      color: WHITE,
    },
  });
};
