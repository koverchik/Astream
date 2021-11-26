import {StyleSheet, ViewStyle} from 'react-native';

export type HorizontalCalendarStylesType = {
  monthAndYear: ViewStyle;
  monthAndYearContainer: ViewStyle;
};

export const styles = StyleSheet.create<HorizontalCalendarStylesType>({
  monthAndYear: {
    color: '#000',
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthAndYearContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
