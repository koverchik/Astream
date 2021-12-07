import {PermissionsAndroid, Platform} from 'react-native';

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
};
