import {Moment} from 'moment';
import {TextStyle} from 'react-native';
import {ActiveDayColorType} from "../types";

export type DatesType = {
  currentDateIndex: number | null;
  dates: Moment[];
  onSelectDay: (index: number, date: Moment) => void;

  activeDayColor?: ActiveDayColorType;
  textDayColor?: TextStyle['color'];
};
