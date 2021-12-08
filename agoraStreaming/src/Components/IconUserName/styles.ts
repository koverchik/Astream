import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {SIZE_USER_POINT} from '.';
import {Colors} from '../../Colors/colors';

type UserNameLabelType = {
  pointUserName: ViewStyle;
  text: TextStyle;
  wavesAroundUserPoint: ViewStyle;
};

const roundStyles: ViewStyle = {
  height: SIZE_USER_POINT,
  width: SIZE_USER_POINT,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  borderRadius: 20,
};

const {bermuda, babyBlueEyes} = Colors;

export const styles = StyleSheet.create<UserNameLabelType>({
  pointUserName: {
    ...roundStyles,
    backgroundColor: bermuda,
  },
  wavesAroundUserPoint: {
    ...roundStyles,
    borderWidth: 2,
    opacity: 0.8,
    borderColor: babyBlueEyes,
  },
  text: {
    textTransform: 'capitalize',
  },
});
