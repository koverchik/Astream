import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import auth from '@react-native-firebase/auth';

import {DefaultAvatar} from '../../Icons/DefaultAvatar';
import {setUser} from '../../Redux/actions/AuthActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {styles} from './style';
import {ProfileScreenProps} from './types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logoutHandler = async () => {
    await auth().signOut();
    await GoogleSignin.signOut();
    dispatch(setUser(null));
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperProfile}>
        <View style={styles.profile}>
          <View style={styles.imageUser}>
            {!user?.photo ? (
              <DefaultAvatar size={'100%'} />
            ) : (
              <Image source={{uri: user?.photo}} style={styles.imageUser} />
            )}
          </View>
          <View>
            <Text>{user?.givenName}</Text>
            <Text>{user?.familyName}</Text>
            <Text>{user?.email}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={logoutHandler}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
