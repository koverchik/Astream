import React, {FC} from 'react';
import {Text, TouchableOpacity, useWindowDimensions} from 'react-native';

import {SearchItemStyles} from './styles';
import {SearchResultItemPropsType} from './types';

export const SearchResultItem: FC<SearchResultItemPropsType> = (props) => {
  const {onPressResult, item} = props;

  const {width} = useWindowDimensions();
  const styles = SearchItemStyles(width);

  const onPressItem = () => {
    if (onPressResult) {
      onPressResult(item);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};
