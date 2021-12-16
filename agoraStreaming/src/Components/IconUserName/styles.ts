import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {SIZE_USER_POINT} from '.';
import {COLORS} from '../../Colors/colors';

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

const {BERMUDA, BABY_BLUE_EYES} = COLORS;

export const styles = StyleSheet.create<UserNameLabelType>({
  pointUserName: {
    ...roundStyles,
    backgroundColor: BERMUDA,
  },
  wavesAroundUserPoint: {
    ...roundStyles,
    borderWidth: 2,
    opacity: 0.8,
    borderColor: BABY_BLUE_EYES,
  },
  text: {
    textTransform: 'capitalize',
  },
});
