import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import auth from '@react-native-firebase/auth';

import {setUser} from '../../Redux/actions/AuthActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {styles} from './style';
import {ProfileScreenProps} from './types';

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logoutHandler = async () => {
    await auth().signOut();
    dispatch(setUser(null));
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperProfile}>
        <View style={styles.profile}>
          <Image
            style={styles.imageUser}
            source={require('../../../assets/images/user.png')}
          />
          <View>
            <Text>{user?.displayName}</Text>
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
