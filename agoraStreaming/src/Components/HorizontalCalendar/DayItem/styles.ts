import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Colors} from '../../../Colors/colors';
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
  const {azureRadiance, black} = Colors;

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
      borderBottomColor: activeDayColor ?? azureRadiance,
    },
    day: {
      fontSize: 12,
    },
    date: {
      fontSize: 20,
    },
    text: {
      color: textDayColor ?? black,
      textAlign: 'center',
    },
    textActive: {
      color: activeDayColor ?? azureRadiance,
    },
  });
};
