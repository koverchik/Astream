import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {SearchResultItemPropsType} from './types';

export const SearchResultItem: FC<SearchResultItemPropsType> = (props) => {
  const {onPressResult, item} = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressResult(item)}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};
