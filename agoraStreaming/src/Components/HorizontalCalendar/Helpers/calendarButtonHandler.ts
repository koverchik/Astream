import {CalendarActions} from '../types';
import {ButtonHandlerParamsType, Month} from './types';

export const buttonsHandler = (params: ButtonHandlerParamsType) => {
  const {setCalendarState, calendarMonth, action} = params;

  const firstMonthInYear = calendarMonth === Month.JANUARY;
  const lastMonthInYear = calendarMonth === Month.DECEMBER;

  switch (action) {
    case CalendarActions.PREV: {
      if (firstMonthInYear) {
        setCalendarState((prev) => ({
          ...prev,
          year: prev.year - 1,
          month: Month.DECEMBER,
        }));
      }

      if (!firstMonthInYear) {
        setCalendarState((prev) => {
          const month = prev.month - 1;

          return {
            ...prev,
            month,
          };
        });
      }
      break;
    }
    case CalendarActions.NEXT: {
      if (lastMonthInYear) {
        setCalendarState((prev) => ({
          ...prev,
          year: prev.year + 1,
          month: Month.JANUARY,
        }));
      }

      if (!lastMonthInYear) {
        setCalendarState((prev) => {
          const month = prev.month + 1;

          return {
            ...prev,
            month,
          };
        });
      }
      break;
    }
  }
};
