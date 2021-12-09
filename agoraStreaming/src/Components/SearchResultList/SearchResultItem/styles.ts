import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Colors} from '../../../Colors/colors';

type FoundStreamItemStylesType = {
  container: ViewStyle;
  text: TextStyle;
};

const {white, mineShaft} = Colors;

export const styles = StyleSheet.create<FoundStreamItemStylesType>({
  container: {
    height: 40,
    backgroundColor: mineShaft,
    marginBottom: 5,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  text: {
    color: white,
  },
});
