import moment from 'moment';

import {CalendarStateType} from '../types';

export const getDateTitle = (calendarState: CalendarStateType) => {
  return moment(`${calendarState.year}-${calendarState.month}`).format(
    'MMMM YYYY',
  );
};
