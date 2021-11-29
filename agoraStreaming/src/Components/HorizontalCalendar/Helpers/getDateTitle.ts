import {CalendarStateType} from '../types';
import moment from 'moment';

export const getDateTitle = (calendarState: CalendarStateType) => {
  const {year, month} = calendarState;

  return moment(`${year}-${month}`).format('MMMM YYYY');
};
