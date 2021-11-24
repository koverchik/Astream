import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {styles} from './style';
import {ProfileScreenProps} from './types';

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperProfile}>
        <View style={styles.profile}>
          <Image
            style={styles.imageUser}
            source={require('../../../assets/images/user.png')}
          />
          <View>
            <Text>First name</Text>
            <Text>Last name</Text>
            <Text>email@test.ru</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('hello')}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
