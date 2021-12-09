import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';

type TabStylesType = {
  tabBar: ViewStyle;
  hiddenTabBar: ViewStyle;
};

export const styles = StyleSheet.create<TabStylesType>({
  tabBar: {
    borderTopColor: COLORS.BLACK,
    backgroundColor: COLORS.BLACK,
    display: 'flex',
  },
  hiddenTabBar: {
    display: 'none',
  },
});
