import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

import {DefaultAvatar} from '../../Icons/DefaultAvatar';
import {setUser} from '../../Redux/actions/AuthActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {AnalyticsType} from '../../Types/universalTypes';
import {styles} from './style';
import {ProfileScreenProps} from './types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await auth().signOut();
    await GoogleSignin.signOut();

    await analytics().logEvent(AnalyticsType.SIGN_OUT);
    dispatch(setUser(null));
  };

  const renderPhoto = () => {
    if (!user?.photo) {
      return <DefaultAvatar size={'100%'} />;
    } else {
      return <Image source={{uri: user?.photo}} style={styles.imageUser} />;
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.wrapperProfile}>
          <View style={styles.profile}>
            <View style={styles.imageUser}>{renderPhoto()}</View>
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
    </View>
  );
};
