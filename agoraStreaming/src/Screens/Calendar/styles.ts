import {StyleSheet, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';
import {SIZE_BUTTON} from '../../Components/ModalCreateEvent/style';
import {CORNERS_RADIUS} from '../Home/style';

type CalendarStylesType = {
  container: ViewStyle;
  background: ViewStyle;
  flatList: ViewStyle;
  flatListContent: ViewStyle;
  flatListContentCenter: ViewStyle;
  addNewEvent: ViewStyle;
  contentContainerStyle: ViewStyle;
  titleForEmptyListContainer: ViewStyle;
  clearButton: ViewStyle;
};

const {white, bittersweet, black, mineShaft} = Colors;

export const styles = StyleSheet.create<CalendarStylesType>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: CORNERS_RADIUS,
    borderBottomStartRadius: CORNERS_RADIUS,
    backgroundColor: white,
  },
  background: {
    flex: 1,
    backgroundColor: black,
  },
  flatList: {
    width: '100%',
  },
  flatListContent: {
    alignItems: 'center',
  },
  addNewEvent: {
    position: 'absolute',
    top: 14,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bittersweet,
    width: SIZE_BUTTON,
    height: SIZE_BUTTON,
    borderRadius: 8,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  flatListContentCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  titleForEmptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    height: SIZE_BUTTON,
    width: SIZE_BUTTON,
    borderRadius: SIZE_BUTTON / 2,
    backgroundColor: mineShaft,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    right: 70,
  },
});
