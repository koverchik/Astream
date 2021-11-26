import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {CalendarButtonStyles} from './stypes';
import {CalendarButtonPropsType} from './types';

export const CalendarButton: FC<CalendarButtonPropsType> = (props) => {
  const {onPress, title, buttonsColor} = props;
  const styles = CalendarButtonStyles(buttonsColor);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
