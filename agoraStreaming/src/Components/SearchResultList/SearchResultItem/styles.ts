import {ScaledSize, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../../Colors/colors';

type FoundStreamItemStylesType = {
  container: ViewStyle;
  text: TextStyle;
};

const {WHITE, COD_GRAY} = COLORS;

export const SearchItemStyles = (width: ScaledSize['width']) => {
  return StyleSheet.create<FoundStreamItemStylesType>({
    container: {
      height: 40,
      width: width - 52,
      backgroundColor: COD_GRAY,
      marginBottom: 7.5,
      justifyContent: 'center',
      paddingHorizontal: 15,
      borderRadius: 15,
    },
    text: {
      color: WHITE,
    },
  });
};
