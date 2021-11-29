import {DateInfoType} from './types';
import moment from 'moment';

export const getCurrentDate = (): DateInfoType => {
  const currentDate = moment();
  const currentMonth = currentDate.month() + 1;
  const currentYear = currentDate.year();
  const today = currentDate.date() - 1;

  return {
    currentDate,
    currentMonth,
    currentYear,
    today,
  };
};
