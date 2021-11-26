import {Dimensions, StyleSheet, ViewStyle} from 'react-native';

const {height} = Dimensions.get('window');

type TabStylesType = {
  tabBar: ViewStyle;
};

export const styles = StyleSheet.create<TabStylesType>({
  tabBar: {
    borderTopColor: '#000',
    height: height * 0.1,
    backgroundColor: '#000',
  },
});
