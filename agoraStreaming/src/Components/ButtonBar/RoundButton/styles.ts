import {StyleSheet} from 'react-native';

const ButtonSize = 50;

export const styles = StyleSheet.create({
  wrapper: {
    width: ButtonSize,
    height: ButtonSize,
    borderRadius: ButtonSize / 2,
    marginHorizontal: 5,
    backgroundColor: '#78adea',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
