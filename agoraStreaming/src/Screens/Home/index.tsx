import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import 'react-native-get-random-values';
import MapView from 'react-native-map-clustering';
import {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {ModalCreateChannel} from '../../Components/ModalCreateChannel';
import {LiveType} from '../../Navigation/types';
import {styles} from './style';
import {
  HomeScreenProps,
  ListChannelsType,
  StackNavigationPropNavigation,
} from './types';

const INITIAL_COORDS = {
  latitude: 53.5078788,
  longitude: 27.0877321,
  latitudeDelta: 2,
  longitudeDelta: 0.009,
};

export const Home: FC<HomeScreenProps> = () => {
  const navigation = useNavigation<StackNavigationPropNavigation>();

  const [coordinates, setCoordinates] = useState(INITIAL_COORDS);

  const [listChannels, setListChannels] = useState<ListChannelsType[]>([]);

  async function requestPermissions() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }
  useEffect(() => {
    requestPermissions();
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setCoordinates((prev) => {
          return {
            ...prev,
            latitude,
            longitude,
          };
        });
      },
      (e) => {
        setCoordinates(INITIAL_COORDS);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    database()
      .ref('/channels')
      .on('value', (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val() != null) {
          setListChannels(Object.values(snapshot.val()));
        } else {
          setListChannels([]);
        }
      });
  }, []);

  const choseChannelAndJoinLive = (channelId: string) => {
    navigation.navigate('Live', {
      type: LiveType.JOIN,
      channelId,
    });
  };
  const allMarkers = listChannels.map((data) => {
    const {name, channelId, coords} = data;
    const {latitude, longitude} = coords;
    return (
      <Marker
        key={channelId}
        coordinate={{
          latitude,
          longitude,
        }}
        onCalloutPress={() => choseChannelAndJoinLive(channelId)}
        title={name}>
        <Callout style={styles.calloutStyle}>
          <TouchableOpacity key={channelId} style={styles.itemChannel}>
            <Text style={styles.buttonText}>{name}</Text>
          </TouchableOpacity>
        </Callout>
      </Marker>
    );
  });

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={coordinates}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        clusterColor={'#FF7070'}
        zoomControlEnabled={true}>
        {allMarkers}
      </MapView>
      <ModalCreateChannel coordinates={coordinates} />
    </View>
  );
};
