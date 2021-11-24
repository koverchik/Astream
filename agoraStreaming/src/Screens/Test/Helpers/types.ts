import {Moment} from 'moment';
import {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {PointPropType} from 'react-native';

import {CalendarActions} from '../TestScreen';
import {CalendarStateType, DateStateType} from '../types';

export type DateInfoType = {
  currentDate: Moment;
  currentMonth: number;
  currentYear: number;
  today: number;
};

export type ButtonHandlerParamsType = {
  action: CalendarActions;
  calendarMonth: number;
  setCalendarState: Dispatch<SetStateAction<CalendarStateType>>;
};

export type ScrollDateParamsType = {
  calendar: CalendarStateType;
  date: DateStateType;
  coords: MutableRefObject<PointPropType>;
  width: number;
};
