import {Dimensions, StyleSheet, ViewStyle} from 'react-native';

type UserNameLabelType = {
  pointUserName: ViewStyle;
  wavesAroundUserPoint: ViewStyle;
};

const dimensions = {
  height: Dimensions.get('window').height,
};

const HEIGHT_USER_POINT = 40;
const WIDTH_USER_POINT = 40;

export const styles = StyleSheet.create<UserNameLabelType>({
  pointUserName: {
    backgroundColor: '#5ebf9d',
    height: HEIGHT_USER_POINT,
    width: WIDTH_USER_POINT,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    left: dimensions.height / 4 - 20,
  },
  wavesAroundUserPoint: {
    borderWidth: 2,
    opacity: 0.8,
    height: HEIGHT_USER_POINT,
    width: WIDTH_USER_POINT,
    marginLeft: 20,
    borderColor: '#6390BB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    left: dimensions.height / 4 - 20,
  },
});
