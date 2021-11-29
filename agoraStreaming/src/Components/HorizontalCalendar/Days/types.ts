import {TextStyle} from 'react-native';

import {ActiveDayColorType} from '../types';
import {Moment} from 'moment';

export type DatesType = {
  currentDateIndex: number | null;
  dates: Moment[];
  onSelectDay: (index: number, date: Moment) => void;

  activeDayColor?: ActiveDayColorType;
  textDayColor?: TextStyle['color'];
};
