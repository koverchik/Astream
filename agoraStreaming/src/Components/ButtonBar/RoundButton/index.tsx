import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';

import {COLORS} from '../../../Colors/colors';
import {styles} from './styles';
import {RoundButtonPropsType} from './types';

export const RoundButton: FC<RoundButtonPropsType> = (props) => {
  const {handler, icon, color} = props;

  return (
    <TouchableOpacity
      style={[styles.wrapper, {backgroundColor: color ?? COLORS.CERULEAN}]}
      onPress={handler}>
      {icon}
    </TouchableOpacity>
  );
};
