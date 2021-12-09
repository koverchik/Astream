import {StyleSheet, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';

type TabStylesType = {
  tabBar: ViewStyle;
  hiddenTabBar: ViewStyle;
};

export const styles = StyleSheet.create<TabStylesType>({
  tabBar: {
    borderTopColor: Colors.black,
    backgroundColor: Colors.black,
    display: 'flex',
  },
  hiddenTabBar: {
    display: 'none',
  },
});
