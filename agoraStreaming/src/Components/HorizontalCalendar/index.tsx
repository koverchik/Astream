import React, {FC, useEffect, useRef, useState} from 'react';
import {
  PointPropType,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {ChangeMonthButton} from './ChangeMonthButton';
import {Dates} from './Days';
import {buttonsHandler} from './helpers/calendarButtonHandler';
import {getCurrentDate} from './helpers/getCurrentDate';
import {getDateIndex} from './helpers/getDateIndex';
import {getDateTitle} from './helpers/getDateTitle';
import {getDates} from './helpers/getDates';
import {scrollToSelectedDate} from './helpers/scrollToSelectedDate';
import {CalendarStyles} from './styles';
import {
  CalendarActions,
  CalendarStateType,
  DateStateType,
  HorizontalCalendarPropsType,
} from './types';
import {Moment} from 'moment';

const SCROLL_EVENT_THROTTLE = 16;

export const HorizontalCalendar: FC<HorizontalCalendarPropsType> = (props) => {
  const {onDayPress, activeDayColor, textDayColor, buttonColor, titleColor} =
    props;
  const {currentMonth, currentYear, today} = getCurrentDate();
  const styles = CalendarStyles(titleColor);

  const coords = useRef<PointPropType>({x: 0, y: 0});
  const {width} = useWindowDimensions();
  const [days, setDays] = useState<Moment[]>([]);

  const [calendarState, setCalendarState] = useState<CalendarStateType>({
    year: currentYear,
    month: currentMonth,
  });

  const [dateState, setDateState] = useState<DateStateType>({
    selectedDayIndex: today,
    selectedMonth: currentMonth,
    selectedYear: currentYear,
  });

  useEffect(() => {
    setDays(getDates(calendarState));
    scrollToSelectedDate({
      calendar: calendarState,
      date: dateState,
      width,
      coords,
    });
  }, [calendarState, dateState, width]);

  const onSelectDay = (index: number, date: Moment) => {
    setDateState((prev) => {
      return {
        ...prev,
        selectedDayIndex: index,
        selectedMonth: calendarState.month,
        selectedYear: calendarState.year,
      };
    });

    if (onDayPress) {
      onDayPress({
        day: date.date(),
        month: date.month() + 1,
        year: date.year(),
      });
    }
  };

  const onPressButton = (action: CalendarActions) => {
    buttonsHandler({
      action,
      calendarMonth: calendarState.month,
      setCalendarState,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthAndYearContainer}>
        <ChangeMonthButton
          onPress={() => onPressButton(CalendarActions.PREV)}
          title={CalendarActions.PREV}
          buttonColor={buttonColor}
        />
        <Text style={styles.monthAndYear}>{getDateTitle(calendarState)}</Text>
        <ChangeMonthButton
          onPress={() => onPressButton(CalendarActions.NEXT)}
          title={CalendarActions.NEXT}
          buttonColor={buttonColor}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        contentOffset={coords.current}>
        <Dates
          dates={days}
          currentDateIndex={getDateIndex(calendarState, dateState)}
          onSelectDay={onSelectDay}
          activeDayColor={activeDayColor}
          textDayColor={textDayColor}
        />
      </ScrollView>
    </View>
  );
};
