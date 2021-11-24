import moment from 'moment';

import {DateInfoType} from './types';

export const getCurrentDate = (): DateInfoType => {
  const currentDate = moment();
  const currentMonth = currentDate.month() + 1;
  const currentYear = currentDate.year();
  const today = +currentDate.format('DD') - 1;

  return {
    currentDate,
    currentMonth,
    currentYear,
    today,
  };
};
