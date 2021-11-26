import {Moment} from 'moment';

export type DatesType = {
  currentDateIndex: number | null;
  dates: Moment[];
  onSelectDay: (index: number, date: Moment) => void;

  activeDayColor?: string;
  textDayColor?: string;
};
