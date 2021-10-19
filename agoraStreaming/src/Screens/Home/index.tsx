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

const INIT_CHANNEL_ID = '';

export const Home: FC<HomeScreenProps> = () => {
  const navigation = useNavigation<StackNavigationPropNavigation>();

  const [channelId, setChannelId] = useState(INIT_CHANNEL_ID);

  const [listChannels, setListChannels] = useState<ListChannelsType[]>([]);

  const isLiveDisabled = channelId === INIT_CHANNEL_ID;

  useEffect(() => {
    database()
      .ref('/channels')
      .once('value')
      .then(snapshot => {
        setListChannels(Object.values(snapshot.val()));
        console.log(listChannels);
      });
  }, []);

  const createLive = () =>
    navigation.navigate('Live', {type: LiveType.CREATE, channel: uuid()});

  const joinLive = () =>
    navigation.navigate('Live', {
      type: LiveType.JOIN,
      channel: channelId,
    });

  const choseChannelAndJoinLive = (idChannel: string) => {
    setChannelId(idChannel);
    joinLive();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livestream App</Text>

      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={createLive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <ListChannels
        data={listChannels}
        choseChannelAndJoinLive={choseChannelAndJoinLive}
      />
      <View style={styles.joinContainer}>
        <TextInput
          value={channelId}
          onChangeText={setChannelId}
          placeholder="Enter Livestream Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={joinLive}
          disabled={isLiveDisabled}
          style={[
            styles.button,
            {backgroundColor: isLiveDisabled ? '#555555' : '#78b0ff'},
          ]}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
