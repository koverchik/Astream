import {VISIBLE_COUNT_DAYS} from '../DayItem/styles';
import {ScrollDateParamsType} from './types';
import moment from 'moment';

export const scrollToSelectedDate = (params: ScrollDateParamsType) => {
  const {date, coords, calendar, width} = params;
  const {selectedMonth, selectedDayIndex, selectedYear} = date;
  const {month, year} = calendar;

  const dayInMonth = moment(`${year}-${month}`).daysInMonth();

  const monthMismatch = selectedMonth !== month;
  const yearMismatch = selectedYear !== year;

  const oneDayWidth = width / VISIBLE_COUNT_DAYS;
  const threeDaysScroll = oneDayWidth * Math.floor(VISIBLE_COUNT_DAYS / 2);
  const scrollFromCurrentDay = selectedDayIndex
    ? selectedDayIndex * oneDayWidth -
      (selectedDayIndex < dayInMonth - 4 ? threeDaysScroll : 0)
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
