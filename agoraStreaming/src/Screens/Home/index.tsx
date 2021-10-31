import React, {FC, useEffect, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
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
  const [coordinates, setCoordinates] = useState({
    latitude: 153.5078788,
    longitude: 127.0877321,
    latitudeDelta: 2,
    longitudeDelta: 0.009,
  });
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
      {/* <Text style={styles.title}>Livestream App</Text>
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
      ) : null} */}
      <MapView
        region={coordinates}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsCompass={true}
        showsScale={true}
        zoomTapEnabled={true}
        zoomControlEnabled={true}
        showsUserLocation={true}
        maxZoomLevel={20}></MapView>
    </View>
  );
};
