import {StyleSheet} from 'react-native';

const BUTTON_SIZE = 50;

export const styles = StyleSheet.create({
  wrapper: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
