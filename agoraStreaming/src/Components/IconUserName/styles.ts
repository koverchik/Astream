import {Dimensions, StyleSheet, ViewStyle} from 'react-native';

type UserNameLabelType = {
  pointUserName: ViewStyle;
  wavesAroundUserPoint: ViewStyle;
};

const dimensions = {
  height: Dimensions.get('window').height,
};

const SIZE_USER_POINT = 40;

const roundStyles: ViewStyle = {
  height: SIZE_USER_POINT,
  width: SIZE_USER_POINT,
  marginLeft: 20,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: dimensions.height / 4 - 20,
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
