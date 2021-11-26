import {Moment} from 'moment';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  PointPropType,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {CalendarButton} from './CalendarButton';
import {Dates} from './Days';
import {buttonsHandler} from './Helpers/calendarButtonHandler';
import {getCurrentDate} from './Helpers/getCurrentDate';
import {getDateIndex} from './Helpers/getDateIndex';
import {getDateTitle} from './Helpers/getDateTitle';
import {getDates} from './Helpers/getDates';
import {scrollToSelectedDate} from './Helpers/scrollToSelectedDate';
import {CalendarStyles} from './styles';
import {
  CalendarActions,
  CalendarStateType,
  DateStateType,
  HorizontalCalendarPropsType,
} from './types';

export const HorizontalCalendar: FC<HorizontalCalendarPropsType> = (props) => {
  const {onDayPress, activeDayColor, textDayColor, buttonsColor, titleColor} =
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

    onDayPress &&
      onDayPress({
        day: date.date(),
        month: date.month() + 1,
        year: date.year(),
      });
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
        <CalendarButton
          onPress={() => onPressButton(CalendarActions.PREV)}
          title={'Prev'}
          buttonsColor={buttonsColor}
        />
        <Text style={styles.monthAndYear}>{getDateTitle(calendarState)}</Text>
        <CalendarButton
          onPress={() => onPressButton(CalendarActions.NEXT)}
          title={'Next'}
          buttonsColor={buttonsColor}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
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
