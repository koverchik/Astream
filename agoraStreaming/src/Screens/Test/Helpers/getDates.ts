import moment, {Moment} from 'moment';

export const getDates = (year: number, month: number): Moment[] => {
  const date = moment(`${year}-${month}`);
  const startDay = date.subtract(date.format('DD'), 'days');
  return [...Array(moment(`${year}-${month}`).daysInMonth())].map((_) => {
    return startDay.add(1, 'day').clone();
  });
};
