import {Moment} from 'moment';

export type DatesType = {
  currentDateIndex: number | null;
  dates: Moment[];
  activeDayColor?: string;
  textDayColor?: string;
  onSelectDay: (index: number, date: Moment) => void;
};
