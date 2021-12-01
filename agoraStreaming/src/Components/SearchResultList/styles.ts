import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {SIZE_BLOCKS_ITEM} from '../Header/styles';

type FoundStreamListStylesType = {
  flatList: ViewStyle;
  emptyListTitle: TextStyle;
};

export const styles = StyleSheet.create<FoundStreamListStylesType>({
  flatList: {
    backgroundColor: 'rgba(52, 52, 52, 1)',
    marginHorizontal: 10,
    borderRadius: SIZE_BLOCKS_ITEM / 2,
    padding: 10,
  },
  emptyListTitle: {
    color: '#fff',
    textAlign: 'center',
  },
});
