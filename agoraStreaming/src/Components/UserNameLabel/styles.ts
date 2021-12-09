import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';

type UserNameLabelType = {
  userName: TextStyle;
  userNameContainer: ViewStyle;
};

const {bermuda, white} = Colors;

export const styles = StyleSheet.create<UserNameLabelType>({
  userNameContainer: {
    backgroundColor: bermuda,
    height: 40,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    color: white,
  },
});
