import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import 'react-native-get-random-values';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  HomeScreenProps,
  ListChannelsType,
  StackNavigationPropNavigation,
} from './types';
import Geolocation from 'react-native-geolocation-service';
import {LiveType} from '../../Navigation/types';
import database from '@react-native-firebase/database';
import {ListChannels} from '../../Components/ListChannels';
import {ModalCreateChannel} from '../../Components/ModalCreateChannel';

export const Home: FC<HomeScreenProps> = () => {
  const navigation = useNavigation<StackNavigationPropNavigation>();

  const [coordinates, setCoordinates] = useState({
    latitude: 53.5078788,
    longitude: 27.0877321,
    latitudeDelta: 2,
    longitudeDelta: 0.009,
  });

  const [listChannels, setListChannels] = useState<ListChannelsType[]>([]);

  async function requestPermissions() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }
  useEffect(() => {
    console.log('hello');
    requestPermissions();
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoordinates(prev => {
          return {
            ...prev,
            latitude,
            longitude,
          };
        });
      },
      e => {
        console.log(e);

        setCoordinates(prev => {
          return {
            ...prev,
            latitude: 9.135511,
            longitude: 48.125577,
          };
        });
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
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
  console.log(listChannels);

  const choseChannelAndJoinLive = (idChannel: string) => {
    navigation.navigate('Live', {
      type: LiveType.JOIN,
      channel: idChannel,
    });
  };
  const allMarkers = listChannels.map(data => {
    return (
      <Marker
        key={data.channel}
        coordinate={{
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        }}
        title={data.name}>
        <Callout style={styles.calloutStyle}>
          <View>
            <TouchableOpacity
              key={data.channel}
              style={styles.itemChannel}
              onPress={() => choseChannelAndJoinLive(data.channel)}>
              <Text style={styles.buttonText}>{data.name}</Text>
            </TouchableOpacity>
          </View>
        </Callout>
      </Marker>
    );
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={createLive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Text style={styles.title}>Livestream App</Text>
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
        zoomTapEnabled={false}
        zoomControlEnabled={true}
        showsUserLocation={true}>
        {allMarkers}
      </MapView>
      <ModalCreateChannel coordinates={coordinates} />
    </View>
  );
};
