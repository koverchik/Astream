import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {ActiveDayColorType} from '../types';

type DayStylesType = {
  container: ViewStyle;
  containerActive: ViewStyle;
  day: TextStyle;
  date: TextStyle;
  text: TextStyle;
  textActive: TextStyle;
};

export const VISIBLE_COUNT_DAYS = 7;

export const DayStyles = (
  width: ScaledSize['width'],
  activeDayColor?: ActiveDayColorType,
  textDayColor?: TextStyle['color'],
) => {
  return StyleSheet.create<DayStylesType>({
    container: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 4,
      justifyContent: 'center',
      alignItems: 'center',
      height: 65,
      width: width / VISIBLE_COUNT_DAYS,
    },
    containerActive: {
      borderBottomColor: activeDayColor ?? '#a975d9',
    },
    day: {
      fontSize: 12,
    },
    date: {
      fontSize: 20,
    },
    text: {
      color: textDayColor ?? '#000',
      textAlign: 'center',
    },
    textActive: {
      color: activeDayColor ?? '#a975d9',
    },
  });
};
