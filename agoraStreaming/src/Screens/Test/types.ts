export type CalendarStateType = {
  year: number;
  month: number;
};

export type DateStateType = {
  selectedDayIndex: number | null;
  selectedMonth: number;
  selectedYear: number;
};

export enum CalendarActions {
  PREV = 'PREV',
  NEXT = 'NEXT',
}

export type DateInfoType = {
  day: number;
  month: number;
  year: number;
};

export type HorizontalCalendarPropsType = {
  onDayPress?: (date: DateInfoType) => void;
};
