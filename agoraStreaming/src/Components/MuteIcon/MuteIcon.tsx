import React, {FC} from 'react';
import {View} from 'react-native';
import {MuteIconPropsType} from './types';
import {styles} from './styles';

export const MuteIcon: FC<MuteIconPropsType> = (props) => {
  const {icon} = props;

  return <View style={styles.muteIcon}>{icon}</View>;
};
