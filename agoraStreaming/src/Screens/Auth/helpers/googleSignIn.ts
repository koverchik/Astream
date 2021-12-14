import {Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

import {setUser} from '../../../Redux/actions/AuthActions';
import {AppDispatch} from '../../../Redux/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {v4 as uuid} from 'uuid';

export const onGoogleButtonPress = async (dispatch: AppDispatch) => {
  try {
    await onAuth(dispatch);
  } catch (error: any) {
    Alert.alert('Error: ', error);
  }
};

export const onAuth = async (dispatch: AppDispatch) => {
  try {
    const isAuth = await getUserData(dispatch);

    if (!isAuth) {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);
      const user = await GoogleSignin.getCurrentUser();
      user && dispatch(setUser(user?.user));
      DeviceInfo.getAndroidId().then((androidId) => {
        analytics().setUserProperty('id', androidId);
      });
      if (user?.user.email) {
        await analytics().logSignUp({
          method: user?.user.email,
        });
        await analytics().setUserId(uuid());
      }
    }
  } catch (error: any) {
    Alert.alert('Error: ', error);
  }
};

export const getUserData = async (dispatch: AppDispatch) => {
  try {
    const isAuth = await GoogleSignin.isSignedIn();

    if (isAuth) {
      const user = await GoogleSignin.getCurrentUser();
      user && dispatch(setUser(user?.user));
    }

    return isAuth;
  } catch (error: any) {
    Alert.alert('Error: ', error);
  }
};
