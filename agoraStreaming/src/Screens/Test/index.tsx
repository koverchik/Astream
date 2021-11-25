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
import {Dates} from './Dates';
import {buttonsHandler} from './Helpers/calendarButtonHandler';
import {getCurrentDate} from './Helpers/getCurrentDate';
import {getDateIndex} from './Helpers/getDateIndex';
import {getDateTitle} from './Helpers/getDateTitle';
import {getDates} from './Helpers/getDates';
import {scrollToSelectedDate} from './Helpers/scrollToSelectedDate';
import {styles} from './styles';
import {
  CalendarActions,
  CalendarStateType,
  DateStateType,
  HorizontalCalendarPropsType,
} from './types';

export const HorizontalCalendar: FC<HorizontalCalendarPropsType> = (props) => {
  const {onDayPress} = props;
  const {currentMonth, currentYear, today} = getCurrentDate();

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
    setDays(getDates(calendarState.year, calendarState.month));
    scrollToSelectedDate({
      calendar: calendarState,
      date: dateState,
      width,
      coords,
    });
  }, [calendarState, dateState]);

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
        day: +date.format('DD'),
        month: date.month() + 1,
        year: date.year(),
      });
  };

  const onPressPrev = () => {
    buttonsHandler({
      action: CalendarActions.PREV,
      calendarMonth: calendarState.month,
      setCalendarState,
    });
  };

  const onPressNext = () => {
    buttonsHandler({
      action: CalendarActions.NEXT,
      calendarMonth: calendarState.month,
      setCalendarState,
    });
  };

  return (
    <View>
      <View style={styles.monthAndYearContainer}>
        <CalendarButton onPress={onPressPrev} title={'Prev'} />
        <Text style={styles.monthAndYear}>{getDateTitle(calendarState)}</Text>
        <CalendarButton onPress={onPressNext} title={'Next'} />
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
        />
      </ScrollView>
    </View>
  );
};
