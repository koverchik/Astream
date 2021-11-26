import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type DayStylesType = {
  container: ViewStyle;
  containerActive: ViewStyle;
  day: TextStyle;
  date: TextStyle;
  text: TextStyle;
  textActive: TextStyle;
};

export const DayStyles = (
  width: ScaledSize['width'],
  activeDayColor?: string,
  textDayColor?: string,
) => {
  return StyleSheet.create<DayStylesType>({
    container: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 4,
      justifyContent: 'center',
      alignItems: 'center',
      height: 65,
      width: width / 7,
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
