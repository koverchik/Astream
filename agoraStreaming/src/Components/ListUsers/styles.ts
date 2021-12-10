import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';

type UserNameLabelType = {
  pointUserName: ViewStyle;
  container: ViewStyle;
};
const SIZE_USER_POINT = 40;

export const styles = StyleSheet.create<UserNameLabelType>({
  pointUserName: {
    height: SIZE_USER_POINT,
    width: SIZE_USER_POINT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE_USER_POINT / 2,
    backgroundColor: COLORS.BERMUDA,
    margin: 10,
  },
  container: {
    flexDirection: 'row',
    alignContent: 'center',
  },
});
