import React, {FC} from 'react';
import {View} from 'react-native';

import {styles} from './styles';
import {MuteIconPropsType} from './types';

export const MuteIcon: FC<MuteIconPropsType> = (props) => {
  const {icon} = props;

  return <View style={styles.muteIcon}>{icon}</View>;
};
