import {ScrollDateParamsType} from './types';

export const scrollToSelectedDate = (params: ScrollDateParamsType) => {
  const {date, coords, calendar, width} = params;
  const {selectedMonth, selectedDayIndex, selectedYear} = date;
  const {month, year} = calendar;

  if (selectedMonth !== month || selectedYear !== year) {
    coords.current = {y: 0, x: 0};
  } else {
    coords.current = {
      y: 0,
      x: selectedDayIndex
        ? (selectedDayIndex * width) / 7 - (width / 7) * 3
        : 0,
    };
  }
};
