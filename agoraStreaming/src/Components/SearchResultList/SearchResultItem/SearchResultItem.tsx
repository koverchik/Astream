import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {SearchResultItemPropsType} from './types';

export const SearchResultItem: FC<SearchResultItemPropsType> = (props) => {
  const {onPressResult, item} = props;

  const onPressItem = () => {
    if (onPressResult && typeof item) {
      onPressResult(item);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};
