import {TextStyle} from 'react-native';

import {ActiveDayColorType} from '../types';
import {Moment} from 'moment';

export type DayPropsType = {
  date: Moment;
  index: number;
  isActive: boolean;
  onPress: (index: number, date: Moment) => void;

  activeDayColor?: ActiveDayColorType;
  textDayColor?: TextStyle['color'];
};
