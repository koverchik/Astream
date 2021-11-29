import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {CalendarButtonStyles} from './styles';
import {CalendarButtonPropsType} from './types';

export const CalendarButton: FC<CalendarButtonPropsType> = (props) => {
  const {onPress, title, buttonsColor} = props;
  const styles = CalendarButtonStyles(buttonsColor);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
