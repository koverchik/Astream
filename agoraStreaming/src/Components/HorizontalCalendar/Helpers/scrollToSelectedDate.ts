import {VISIBLE_COUNT_DAYS} from '../DayItem/styles';
import {ScrollDateParamsType} from './types';

export const scrollToSelectedDate = (params: ScrollDateParamsType) => {
  const {date, coords, calendar, width} = params;
  const {selectedMonth, selectedDayIndex, selectedYear} = date;
  const {month, year} = calendar;

  const monthMismatch = selectedMonth !== month;
  const yearMismatch = selectedYear !== year;

  const oneDayWidth = width / VISIBLE_COUNT_DAYS;
  const threeDaysScroll = oneDayWidth * Math.floor(VISIBLE_COUNT_DAYS / 2);
  const scrollFromCurrentDay = selectedDayIndex
    ? selectedDayIndex * oneDayWidth - threeDaysScroll
    : 0;

  if (monthMismatch || yearMismatch) {
    coords.current = {y: 0, x: 0};
  } else {
    coords.current = {
      y: 0,
      x: scrollFromCurrentDay,
    };
  }
};
