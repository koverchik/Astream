import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './UserName.styles';
import {UserNameLabelPropsType} from './UserName.types';

export const UserNameLabel: FC<UserNameLabelPropsType> = props => {
  const {userName} = props;

  return (
    <View style={styles.userNameContainer}>
      <Text style={styles.userName}>{userName.slice(0, 10)}</Text>
    </View>
  );
};
