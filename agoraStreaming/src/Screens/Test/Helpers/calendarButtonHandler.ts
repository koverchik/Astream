import {CalendarActions} from '../types';
import {ButtonHandlerParamsType} from './types';

export const buttonsHandler = (params: ButtonHandlerParamsType) => {
  const {setCalendarState, calendarMonth, action} = params;

  if (action === CalendarActions.PREV) {
    if (calendarMonth === 1) {
      setCalendarState((prev) => ({
        ...prev,
        year: prev.year - 1,
        month: 12,
      }));
    } else {
      setCalendarState((prev) => {
        const month = prev.month - 1;
        return {
          ...prev,
          month,
        };
      });
    }
  }
  if (action === CalendarActions.NEXT) {
    if (calendarMonth === 12) {
      setCalendarState((prev) => ({
        ...prev,
        year: prev.year + 1,
        month: 1,
      }));
    } else {
      setCalendarState((prev) => {
        const month = prev.month + 1;
        return {
          ...prev,
          month,
        };
      });
    }
  }
};
