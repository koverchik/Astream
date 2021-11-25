import {CalendarStateType, DateStateType} from '../types';

export const getDateIndex = (
  calendarState: CalendarStateType,
  dateState: DateStateType,
) => {
  const {month, year} = calendarState;
  const {selectedDayIndex, selectedYear, selectedMonth} = dateState;
  return month === selectedMonth && year === selectedYear
    ? selectedDayIndex
    : null;
};
