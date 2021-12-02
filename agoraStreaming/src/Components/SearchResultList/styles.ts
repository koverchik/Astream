import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {SIZE_BLOCKS_ITEM} from '../Header/styles';

type SearchResultListStylesType = {
  flatList: ViewStyle;
  emptyListTitle: TextStyle;
};

export const SearchResultStyles = (width: ScaledSize['width']) => {
  return StyleSheet.create<SearchResultListStylesType>({
    flatList: {
      position: 'absolute',
      top: 60,
      width: width - 20,
      backgroundColor: '#343434FF',
      marginHorizontal: 10,
      borderRadius: SIZE_BLOCKS_ITEM / 2,
      padding: 10,
    },
    emptyListTitle: {
      color: '#fff',
      textAlign: 'center',
    },
  });
};
