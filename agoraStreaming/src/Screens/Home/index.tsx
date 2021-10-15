import React, {FC, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {
  HomeScreenProps,
  LiveType,
  StackNavigationPropNavigation,
} from './types';
const INIT_CHANNEL_ID = '';

export const Home: FC<HomeScreenProps> = () => {
  const navigation = useNavigation<StackNavigationPropNavigation>();

  const [channelId, setChannelId] = useState(INIT_CHANNEL_ID);

  const isLiveDisabled = channelId === INIT_CHANNEL_ID;

  const createLive = () =>
    navigation.navigate('Live', {type: LiveType.CREATE, channel: uuid()});

  const joinLive = () =>
    navigation.navigate('Live', {
      type: LiveType.JOIN,
      channel: INIT_CHANNEL_ID,
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livestream App</Text>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={createLive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
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
