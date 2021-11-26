import moment from 'moment';

import {CalendarStateType} from '../types';

export const getDateTitle = (calendarState: CalendarStateType) => {
  const {year, month} = calendarState;

  return moment(`${year}-${month}`).format('MMMM YYYY');
};
