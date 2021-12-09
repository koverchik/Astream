import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';
import {SIZE_BLOCKS_ITEM} from '../Header/styles';

type SearchResultListStylesType = {
  flatList: ViewStyle;
  emptyListTitle: TextStyle;
};

export const SearchResultStyles = (width: ScaledSize['width']) => {
  const {mineShaft, white} = Colors;

  return StyleSheet.create<SearchResultListStylesType>({
    flatList: {
      width: width - 20,
      backgroundColor: mineShaft,
      marginHorizontal: 10,
      borderRadius: SIZE_BLOCKS_ITEM / 2,
      padding: 10,
    },
    emptyListTitle: {
      color: white,
      textAlign: 'center',
    },
  });
};
