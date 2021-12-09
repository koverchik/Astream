import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../../Colors/colors';

type FoundStreamItemStylesType = {
  container: ViewStyle;
  text: TextStyle;
};

const {WHITE, MINE_SHAFT} = COLORS;

export const styles = StyleSheet.create<FoundStreamItemStylesType>({
  container: {
    height: 40,
    backgroundColor: MINE_SHAFT,
    marginBottom: 5,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  text: {
    color: WHITE,
  },
});
