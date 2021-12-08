import React, {FC} from 'react';
import {View} from 'react-native';

import {useAppDispatch} from '../../Redux/hooks';
import {onGoogleButtonPress} from './helpers/googleSignIn';
import {styles} from './styles';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export const AuthScreen: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onGoogleButtonPress(dispatch)}
      />
    </View>
  );
};
