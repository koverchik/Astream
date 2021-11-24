import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  Image,
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
import {LiveType, RootStackParamList} from '../../Navigation/types';
import {SIZE_MARKER, styles} from './style';
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
        if (snapshot.val() != null) {
          setListChannels(Object.values(snapshot.val()));
        } else {
          setListChannels([]);
        }
      });
  }, []);

  const choseChannelAndJoinLive = (
    channelId: string,
    isVideo: RootStackParamList['Live']['isVideo'],
  ) => {
    navigation.navigate('Live', {
      type: LiveType.JOIN,
      channelId,
      isVideo,
    });
  };

  const allMarkers = listChannels.map((data) => {
    const {name, channelId, coords, isVideo} = data;
    const {latitude, longitude} = coords;
    return (
      <Marker
        key={channelId}
        coordinate={{
          latitude,
          longitude,
        }}
        onCalloutPress={() => choseChannelAndJoinLive(channelId, isVideo)}
        title={name}>
        <View style={styles.marker}>
          <Image
            source={
              isVideo
                ? require('../../../assets/images/video-camera.png')
                : require('../../../assets/images/sound-bars.png')
            }
            style={{height: SIZE_MARKER - 15, width: SIZE_MARKER - 15}}
            resizeMode="contain"
          />
        </View>

        <Callout style={styles.calloutStyle}>
          <TouchableOpacity key={channelId} style={styles.itemChannel}>
            <Text style={styles.buttonText}>{name}</Text>
            <Text>{isVideo ? 'Video' : 'Audio'}</Text>
          </TouchableOpacity>
        </Callout>
      </Marker>
    );
  });

  return (
    <View style={styles.background}>
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
    </View>
  );
};
