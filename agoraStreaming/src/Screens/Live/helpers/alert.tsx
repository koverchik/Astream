import {Alert} from 'react-native';

export const errorAlert = (message: string, fn: () => void) => {
  Alert.alert('Error', message, [
    {
      text: 'Cancel',
      onPress: fn,
      style: 'cancel',
    },
  ]);
};
