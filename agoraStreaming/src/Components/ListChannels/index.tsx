import React, {FC} from 'react';
import {Text, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';

import {ListChannelsType} from './types';

export const ListChannels: FC<ListChannelsType> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.name}
            style={styles.itemChannel}
            onPress={() => props.choseChannelAndJoinLive(item.name)}>
            <Text style={styles.buttonTextChannel}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name + Math.random().toString()}
      />
    </SafeAreaView>
  );
};
