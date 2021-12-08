import {StyleSheet, ViewStyle} from 'react-native';

import {SIZE_USER_POINT} from '.';

type UserNameLabelType = {
  pointUserName: ViewStyle;
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

export const styles = StyleSheet.create<UserNameLabelType>({
  pointUserName: {
    ...roundStyles,
    backgroundColor: '#5ebf9d',
  },
  wavesAroundUserPoint: {
    ...roundStyles,
    borderWidth: 2,
    opacity: 0.8,
    borderColor: '#6390BB',
  },
});
