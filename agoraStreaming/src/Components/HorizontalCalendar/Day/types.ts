import {Moment} from 'moment';

export type DayPropsType = {
  date: Moment;
  index: number;
  isActive: boolean;
  onPress: (index: number, date: Moment) => void;

  activeDayColor?: string;
  textDayColor?: string;
};
