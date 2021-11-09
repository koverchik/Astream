import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {styles} from './styles';
import {RoundButtonPropsType} from './types';

export const RoundButton: FC<RoundButtonPropsType> = (props) => {
  const {handler, icon, color} = props;
  return (
    <Pressable
      style={[styles.wrapper, {backgroundColor: color ?? '#10b4ef'}]}
      onPress={handler}>
      {icon}
    </Pressable>
  );
};
