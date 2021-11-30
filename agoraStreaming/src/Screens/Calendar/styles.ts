import {StyleSheet, ViewStyle} from 'react-native';

import {SIZE_BUTTON} from '../../Components/ModalCreateStream/style';
import {CORNERS_RADIUS} from '../Home/style';

type CalendarStylesType = {
  container: ViewStyle;
  background: ViewStyle;
  flatList: ViewStyle;
  flatListContent: ViewStyle;
  flatListContentCenter: ViewStyle;
  addNewEvent: ViewStyle;
};

export const styles = StyleSheet.create<CalendarStylesType>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: CORNERS_RADIUS,
    borderBottomStartRadius: CORNERS_RADIUS,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatList: {
    width: '100%',
  },
  flatListContent: {
    alignItems: 'center',
  },
  addNewEvent: {
    position: 'absolute',
    top: 69,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
    width: SIZE_BUTTON,
    height: SIZE_BUTTON,
    borderRadius: 8,
  },
  flatListContentCenter: {
    flex: 1,
    justifyContent: 'center',
  },
});
