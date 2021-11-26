import {CalendarStateType, DateStateType} from '../types';

export const getDateIndex = (
  calendarState: CalendarStateType,
  dateState: DateStateType,
) => {
  const {month, year} = calendarState;
  const {selectedDayIndex, selectedYear, selectedMonth} = dateState;

  const currentMonth = month === selectedMonth
  const currentYear = year === selectedYear

  return currentMonth && currentYear
    ? selectedDayIndex
    : null;
};
