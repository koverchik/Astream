import {StyleSheet, ViewStyle} from 'react-native';

export type HorizontalCalendarStylesType = {
  monthAndYear: ViewStyle;
  monthAndYearContainer: ViewStyle;
  container: ViewStyle;
};

export const CalendarStyles = (titleColor?: string) => {
  return StyleSheet.create<HorizontalCalendarStylesType>({
    monthAndYear: {
      color: titleColor ?? '#000',
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
