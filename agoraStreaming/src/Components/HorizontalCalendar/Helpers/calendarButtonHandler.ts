import {CalendarActions} from '../types';
import {ButtonHandlerParamsType} from './types';

const JANUARY = 1;
const DECEMBER = 12;

export const buttonsHandler = (params: ButtonHandlerParamsType) => {
  const {setCalendarState, calendarMonth, action} = params;
  const firstMonthInYear = calendarMonth === JANUARY;
  const lastMonthInYear = calendarMonth === DECEMBER;

  switch (action) {
    case CalendarActions.PREV: {
      if (firstMonthInYear) {
        setCalendarState((prev) => ({
          ...prev,
          year: prev.year - 1,
          month: DECEMBER,
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
          month: JANUARY,
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
