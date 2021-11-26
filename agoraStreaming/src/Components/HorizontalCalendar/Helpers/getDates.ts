import moment, {Moment} from 'moment';

import {CalendarStateType} from '../types';

export const getDates = (calendarState: CalendarStateType): Moment[] => {
  const {year, month} = calendarState;
  const date = moment(`${year}-${month}`);
  const startDay = date.subtract(date.date(), 'days');
  return [...Array(moment(`${year}-${month}`).daysInMonth())].map((_) => {
    return startDay.add(1, 'day').clone();
  });
};
