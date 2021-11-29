import {StyleSheet, ViewStyle} from 'react-native';

type TabStylesType = {
  tabBar: ViewStyle;
  hiddenTabBar: ViewStyle;
};

export const styles = StyleSheet.create<TabStylesType>({
  tabBar: {
    borderTopColor: '#000',
    backgroundColor: '#000',
    display: 'flex',
  },
  hiddenTabBar: {
    display: 'none',
  },
});
