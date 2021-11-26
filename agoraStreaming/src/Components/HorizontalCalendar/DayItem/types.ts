import {Moment} from 'moment';
import {ActiveDayColorType} from "../types";
import {TextStyle} from "react-native";

export type DayPropsType = {
  date: Moment;
  index: number;
  isActive: boolean;
  onPress: (index: number, date: Moment) => void;

  activeDayColor?: ActiveDayColorType;
  textDayColor?: TextStyle['color'];
};
