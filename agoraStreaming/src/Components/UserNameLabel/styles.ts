import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';

type UserNameLabelType = {
  userName: TextStyle;
  userNameContainer: ViewStyle;
};

const {BERMUDA, WHITE} = COLORS;

export const styles = StyleSheet.create<UserNameLabelType>({
  userNameContainer: {
    backgroundColor: BERMUDA,
    height: 40,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    color: WHITE,
  },
});
