import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';
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
  clearButton: ViewStyle;
};

const {WHITE, BITTERSWEET, BLACK, MINE_SHAFT} = COLORS;

const ADD_EVENT_BUTTON_SIZE = 50;

export const styles = StyleSheet.create<CalendarStylesType>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: CORNERS_RADIUS,
    borderBottomStartRadius: CORNERS_RADIUS,
    backgroundColor: WHITE,
  },
  background: {
    flex: 1,
    backgroundColor: BLACK,
  },
  flatList: {
    width: '100%',
  },
  flatListContent: {
    alignItems: 'center',
  },
  addNewEvent: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BITTERSWEET,
    width: ADD_EVENT_BUTTON_SIZE,
    height: ADD_EVENT_BUTTON_SIZE,
    borderRadius: ADD_EVENT_BUTTON_SIZE / 2,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  flatListContentCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  clearButton: {
    height: SIZE_BUTTON,
    width: SIZE_BUTTON,
    borderRadius: SIZE_BUTTON / 2,
    backgroundColor: MINE_SHAFT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    right: 70,
  },
});
