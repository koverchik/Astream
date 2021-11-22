import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {FC} from 'react';
import {View} from 'react-native';

import {onGoogleButtonPress} from './helpers/googleSignIn';
import {styles} from './styles';

export const AuthScreen: FC = () => {
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
    </View>
  );
};
