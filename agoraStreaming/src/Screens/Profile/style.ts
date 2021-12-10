import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';
import {CORNERS_RADIUS} from '../Home/style';

type HomeScreenStylesType = {
  container: ViewStyle;
  wrapperProfile: ViewStyle;
  button: ViewStyle;
  profile: ViewStyle;
  background: ViewStyle;
  imageUser: ImageStyle;
};

const SIZE_ICON_USER = 60;

const {WHITE, BLACK, BABY_BLUE_EYES, BITTERSWEET} = COLORS;

export const styles = StyleSheet.create<HomeScreenStylesType>({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    borderBottomEndRadius: CORNERS_RADIUS,
    borderBottomStartRadius: CORNERS_RADIUS,
  },
  background: {
    flex: 1,
    backgroundColor: BLACK,
  },
  wrapperProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profile: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: BITTERSWEET,
    borderRadius: SIZE_ICON_USER / 2,
    margin: 20,
    padding: 10,
  },
  imageUser: {
    backgroundColor: WHITE,
    height: SIZE_ICON_USER,
    width: SIZE_ICON_USER,
    borderRadius: SIZE_ICON_USER / 2,
  },
  button: {
    alignItems: 'center',
    width: 150,
    padding: 15,
    backgroundColor: BABY_BLUE_EYES,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
});
