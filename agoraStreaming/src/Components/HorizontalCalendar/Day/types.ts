import {Moment} from 'moment';

export type DayPropsType = {
  date: Moment;
  index: number;
  isActive: boolean;
  activeDayColor?: string;
  textDayColor?: string;
  onPress: (index: number, date: Moment) => void;
};
