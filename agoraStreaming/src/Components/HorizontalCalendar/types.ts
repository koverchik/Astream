import {TextStyle, ViewStyle} from 'react-native';

import {Moment} from 'moment';

export type CalendarStateType = {
  year: ReturnType<Moment['year']>;
  month: ReturnType<Moment['month']>;
};

export type DateStateType = {
  selectedDayIndex: number | null;
  selectedMonth: ReturnType<Moment['month']>;
  selectedYear: ReturnType<Moment['year']>;
};

export enum CalendarActions {
  PREV = 'PREV',
  NEXT = 'NEXT',
}

export type DateInfoType = {
  day: ReturnType<Moment['date']>;
  month: ReturnType<Moment['month']>;
  year: ReturnType<Moment['year']>;
};

export type HorizontalCalendarPropsType = {
  onDayPress?: (date: DateInfoType) => void;
  activeDayColor?: ActiveDayColorType;
  textDayColor?: TextStyle['color'];
  buttonsColor?: ViewStyle['backgroundColor'];
  titleColor?: TextStyle['color'];
};

export type ActiveDayColorType =
  | ViewStyle['borderBottomColor']
  | TextStyle['color'];
