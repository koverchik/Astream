import {StyleSheet, ViewStyle} from 'react-native';

type DaysStylesType = {
  container: ViewStyle;
};

export const styles = StyleSheet.create<DaysStylesType>({
  container: {
    flexDirection: 'row',
  },
});
