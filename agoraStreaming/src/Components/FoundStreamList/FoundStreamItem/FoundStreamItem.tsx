import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {FoundStreamItemPropsType} from './types';

export const FoundStreamItem: FC<FoundStreamItemPropsType> = (props) => {
  const {onPressResult, stream} = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressResult(stream)}>
      <Text style={styles.text}>{stream.name}</Text>
    </TouchableOpacity>
  );
};
