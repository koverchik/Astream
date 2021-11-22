import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';

import {BottomTabs} from './src/Navigation/Tab';
import {AuthScreen} from './src/Screens/Auth';

export default function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1088468777432-7titji4f8tsu0oorpqfibu469sl8jvnj.apps.googleusercontent.com',
    });
    auth().onAuthStateChanged((userInfo) => {
      if (userInfo) {
        setUser(userInfo);
      } else {
        console.log('User not logged in');
      }
    });
  }, []);

  if (!user) {
    return <AuthScreen />;
  }

  return <BottomTabs />;
}
