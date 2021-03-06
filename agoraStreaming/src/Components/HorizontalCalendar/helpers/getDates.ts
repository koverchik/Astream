import {CalendarStateType} from '../types';
import moment, {Moment} from 'moment';

export const getDates = (calendarState: CalendarStateType): Moment[] => {
  const {year, month} = calendarState;

  const date = `${year}-${month}`;
  const currentDate = moment(date);
  const startDay = currentDate.subtract(currentDate.date(), 'days');
  const dayInMonth = moment(date).daysInMonth();

  return [...Array(dayInMonth)].map(() => startDay.add(1, 'day').clone());
};
