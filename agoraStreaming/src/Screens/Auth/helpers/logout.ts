import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
