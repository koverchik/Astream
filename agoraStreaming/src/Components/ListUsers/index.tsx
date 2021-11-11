import React, {FC} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {styles} from './styles';
import {ListUsersType} from './types';

export const ListUsers: FC<ListUsersType> = (props) => {
  const {hiddenUsers} = props;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={hiddenUsers}
        renderItem={({item}) => {
          return (
            <View style={styles.pointUserName} key={'pointUser' + item.uid}>
              <Text>{item.userAccount.slice(0, 1)}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.userAccount}
      />
    </View>
  );
};
