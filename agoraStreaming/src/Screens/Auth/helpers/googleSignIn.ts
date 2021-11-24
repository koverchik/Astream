import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const onGoogleButtonPress = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  } catch (error: any) {
    Alert.alert('Error: ', error);
  }
};
