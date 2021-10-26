import React, {FC, useEffect, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import {
  HomeScreenProps,
  ListChannelsType,
  StackNavigationPropNavigation,
} from './types';

import {LiveType} from '../../Navigation/types';
import database from '@react-native-firebase/database';
import {ListChannels} from '../../Components/ListChannels';

export const Home: FC<HomeScreenProps> = () => {
  const navigation = useNavigation<StackNavigationPropNavigation>();

  const [listChannels, setListChannels] = useState<ListChannelsType[]>([]);

  useEffect(() => {
    console.log('hello');

    database()
      .ref('/channels')
      .on('value', snapshot => {
        console.log(snapshot.val());
        if (snapshot.val() != null) {
          setListChannels(Object.values(snapshot.val()));
        } else {
          setListChannels([]);
        }
      });
  }, []);

  const createLive = () =>
    navigation.navigate('Live', {type: LiveType.CREATE, channel: uuid()});

  const choseChannelAndJoinLive = (idChannel: string) => {
    navigation.navigate('Live', {
      type: LiveType.JOIN,
      channel: idChannel,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livestream App</Text>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={createLive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      {listChannels ? (
        <ListChannels
          data={listChannels}
          choseChannelAndJoinLive={choseChannelAndJoinLive}
        />
      ) : null}
    </View>
  );
};
