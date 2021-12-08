import {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {PointPropType} from 'react-native';

import {CalendarActions, CalendarStateType, DateStateType} from '../types';
import {Moment} from 'moment';

export type DateInfoType = {
  currentDate: Moment;
  currentMonth: ReturnType<Moment['month']>;
  currentYear: ReturnType<Moment['year']>;
  today: ReturnType<Moment['date']>;
};

export type ButtonHandlerParamsType = {
  action: CalendarActions;
  calendarMonth: ReturnType<Moment['month']>;
  setCalendarState: Dispatch<SetStateAction<CalendarStateType>>;
};

export type ScrollDateParamsType = {
  calendar: CalendarStateType;
  date: DateStateType;
  coords: MutableRefObject<PointPropType>;
  width: number;
};

export enum Month {
  JANUARY = 1,
  DECEMBER = 12,
}
