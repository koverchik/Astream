import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';

export type HorizontalCalendarStylesType = {
  monthAndYear: ViewStyle;
  monthAndYearContainer: ViewStyle;
  container: ViewStyle;
};

export const CalendarStyles = (titleColor?: TextStyle['color']) => {
  return StyleSheet.create<HorizontalCalendarStylesType>({
    monthAndYear: {
      color: titleColor ?? COLORS.BLACK,
      margin: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    monthAndYearContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      height: 125,
    },
  });
};
