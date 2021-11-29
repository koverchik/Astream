import React, {FC} from 'react';
import {Text, TouchableOpacity, useWindowDimensions} from 'react-native';

import {DayStyles} from './styles';
import {DayPropsType} from './types';

export const DayItem: FC<DayPropsType> = (props) => {
  const {date, index, isActive, onPress, activeDayColor, textDayColor} = props;
  const {width} = useWindowDimensions();
  const styles = DayStyles(width, activeDayColor, textDayColor);

  const getContainerStyle = () => ({
    ...styles.container,
    ...(isActive ? styles.containerActive : {}),
  });

  const getDayStyle = () => ({
    ...styles.text,
    ...styles.day,
    ...(isActive ? styles.textActive : {}),
  });

  const getDateStyle = () => ({
    ...styles.text,
    ...styles.date,
    ...(isActive ? styles.textActive : {}),
  });

  const onPressHandler = () => {
    onPress(index, date);
  };

  return (
    <TouchableOpacity style={getContainerStyle()} onPress={onPressHandler}>
      <Text style={getDayStyle()}>{date.format('ddd').toUpperCase()}</Text>
      <Text style={getDateStyle()}>{date.format('DD')}</Text>
    </TouchableOpacity>
  );
};
