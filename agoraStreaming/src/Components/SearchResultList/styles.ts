import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';
import {SIZE_BLOCKS_ITEM} from '../Header/styles';

type SearchResultListStylesType = {
  flatList: ViewStyle;
  content: ViewStyle;
  emptyListTitle: TextStyle;
};

export const SearchResultStyles = (width: ScaledSize['width']) => {
  const {MINE_SHAFT, WHITE} = COLORS;

  return StyleSheet.create<SearchResultListStylesType>({
    flatList: {
      width: width - 20,
      backgroundColor: MINE_SHAFT,
      borderRadius: SIZE_BLOCKS_ITEM / 2,
      padding: 10,
      height: 200,
    },
    emptyListTitle: {
      color: WHITE,
      textAlign: 'center',
    },
    content: {
      alignItems: 'center',
    },
  });
};
