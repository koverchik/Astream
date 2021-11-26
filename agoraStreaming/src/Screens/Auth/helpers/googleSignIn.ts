import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

import {setUser} from '../../../Redux/actions/AuthActions';
import {AppDispatch} from '../../../Redux/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const user = await GoogleSignin.getCurrentUser();
      user && dispatch(setUser(user?.user));
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
