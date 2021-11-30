import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {ChangeMonthButtonStyles} from './styles';
import {ChangeMonthButtonPropsType} from './types';

export const ChangeMonthButton: FC<ChangeMonthButtonPropsType> = (props) => {
  const {onPress, title, buttonColor} = props;
  const styles = ChangeMonthButtonStyles(buttonColor);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
