import moment, {Moment} from 'moment';

import {CalendarStateType} from '../types';

export const getDates = (calendarState: CalendarStateType): Moment[] => {
  const {year, month} = calendarState;

  const date = `${year}-${month}`
  const currentDate = moment(date);
  const startDay = currentDate.subtract(currentDate.date(), 'days');
  const dayInMonth = moment(date).daysInMonth()

  return [...Array(dayInMonth)].map((_) => startDay.add(1, 'day').clone());
};
