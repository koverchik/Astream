import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {MARGIN, SIZE_BLOCKS_ITEM} from '../Header/styles';

type FoundStreamListStylesType = {
  flatList: ViewStyle;
  emptyListTitle: TextStyle;
};

export const FoundStreamListStyles = (width: ScaledSize['width']) => {
  return StyleSheet.create<FoundStreamListStylesType>({
    flatList: {
      backgroundColor: 'rgba(52, 52, 52, 1)',
      marginHorizontal: 10,
      borderRadius: 35 / 2,
      padding: 10,
      width: width - SIZE_BLOCKS_ITEM * 2 + MARGIN,
    },
    emptyListTitle: {
      color: '#fff',
      textAlign: 'center',
    },
  });
};
