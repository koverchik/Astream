import {StyleSheet} from 'react-native';

const ButtonSize = 50;

export const styles = StyleSheet.create({
  wrapper: {
    width: ButtonSize,
    height: ButtonSize,
    borderRadius: 5,
    backgroundColor: '#FF7070',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
