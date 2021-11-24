import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles} from './stypes';
import {CalendarButtonPropsType} from './types';

export const CalendarButton: FC<CalendarButtonPropsType> = (props) => {
  const {onPress, title} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
