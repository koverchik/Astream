import {StyleSheet, ViewStyle} from 'react-native';

type StreamEventsStylesType = {
  titleForEmptyListContainer: ViewStyle;
};

export const styles = StyleSheet.create<StreamEventsStylesType>({
  titleForEmptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
