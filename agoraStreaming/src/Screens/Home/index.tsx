import React, {FC, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStyles} from './style';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {HomeScreenProps, StackNavigationPropNavigation} from './types';

export const Home: FC<HomeScreenProps> = () => {
  const navigation = useNavigation<StackNavigationPropNavigation>();
  const [joinChannel, setJoinChannel] = useState('');

  const Styles = createStyles();

  const createLive = () =>
    navigation.navigate('Live', {type: 'create', channel: uuid()});
  const joinLive = () =>
    navigation.navigate('Live', {type: 'join', channel: joinChannel});

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Livestream App</Text>
      <View style={Styles.createContainer}>
        <TouchableOpacity style={Styles.button} onPress={createLive}>
          <Text style={Styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.joinContainer}>
        <TextInput
          value={joinChannel}
          onChangeText={setJoinChannel}
          placeholder="Enter Livestream Id"
          style={Styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={joinLive}
          disabled={joinChannel === ''}
          style={[
            Styles.button,
            {backgroundColor: joinChannel === '' ? '#555555' : '#78b0ff'},
          ]}>
          <Text style={Styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
