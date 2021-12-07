import {Dimensions, StyleSheet, ViewStyle} from 'react-native';

import {SIZE_USER_POINT} from '.';

type UserNameLabelType = {
  pointUserName: ViewStyle;
  wavesAroundUserPoint: ViewStyle;
};

const {height, width} = Dimensions.get('window');

const roundStyles: ViewStyle = {
  height: SIZE_USER_POINT,
  width: SIZE_USER_POINT,
  top: height / 2 - SIZE_USER_POINT / 2,
  left: width / 2 - SIZE_USER_POINT / 2,
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
