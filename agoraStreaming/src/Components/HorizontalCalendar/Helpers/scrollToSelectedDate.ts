import {VISIBLE_COUNT_DAYS} from '../DayItem/styles';
import {DateStateType} from '../types';
import {ScrollDateParamsType} from './types';
import moment from 'moment';

export const scrollToSelectedDate = (params: ScrollDateParamsType) => {
  const {date, coords, calendar, width} = params;
  const {selectedMonth, selectedDayIndex, selectedYear} = date;
  const {month, year} = calendar;

  const dayInMonth = moment(`${year}-${month}`).daysInMonth();
  const oneDayWidth = width / VISIBLE_COUNT_DAYS;
  const threeDaysScroll = oneDayWidth * Math.floor(VISIBLE_COUNT_DAYS / 2);

  const monthMismatch = selectedMonth !== month;
  const yearMismatch = selectedYear !== year;

  const scrollFromCurrentDayHandler = (
    index: DateStateType['selectedDayIndex'],
  ) => {
    if (index) {
      if (index > dayInMonth - 7) {
        return (dayInMonth - 7) * oneDayWidth;
      }

      if (index < dayInMonth - 4) {
        return index * oneDayWidth - threeDaysScroll;
      }
    }

    return 0;
  };

  if (monthMismatch || yearMismatch) {
    coords.current = {y: 0, x: 0};
  } else {
    coords.current = {
      y: 0,
      x: scrollFromCurrentDayHandler(selectedDayIndex),
    };
  }
};
