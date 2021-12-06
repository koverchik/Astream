import React, {FC, useEffect, useRef, useState} from 'react';
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
import MapView, {Callout, PROVIDER_GOOGLE, Region} from 'react-native-maps';

import database from '@react-native-firebase/database';

import {GoogleMapsMarker} from '../../Components/GoogleMapsMarker/GoogleMapsMarker';
import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {
  HomeStackScreens,
  LiveType,
  RootStackParamList,
} from '../../Navigation/Stack/types';
import {
  setChannelsListAction,
  setCoordinatesAction,
  setShowCalloutAction,
} from '../../Redux/actions/HomeActions';
import {setJoinedAction} from '../../Redux/actions/LiveActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {
  selectChannelsList,
  selectCoordinates,
} from '../../Redux/selectors/HomeSelectors';
import {styles} from './style';
import {HomeScreenProps, ListChannelsType} from './types';

const INITIAL_COORDS = {
  latitude: 53.5078788,
  longitude: 27.0877321,
  latitudeDelta: 2,
  longitudeDelta: 0.009,
};

export const Home: FC<HomeScreenProps> = ({navigation}) => {
  const coordinates = useAppSelector(selectCoordinates);
  const channelsList = useAppSelector(selectChannelsList);
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentGeolocation, setCurrentGeolocation] =
    useState<Region>(INITIAL_COORDS);

  const mapRef = useRef<MapView | null>(null);

  const changeModalVisible = () => setModalVisible(!modalVisible);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  };

  useEffect(() => {
    mapRef.current?.animateToRegion(coordinates);
  }, [coordinates]);

  useEffect(() => {
    requestPermissions();
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setCurrentGeolocation({...coordinates, latitude, longitude});
      },
      () => {
        dispatch(setCoordinatesAction(INITIAL_COORDS));
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    database()
      .ref('/channels')
      .on('value', (snapshot) => {
        if (snapshot.val() !== null) {
          const channelListFirebase: ListChannelsType[] = Object.values(
            snapshot.val(),
          );

          const newChannelList = channelListFirebase.map((channel) => {
            return {
              ...channel,
              calloutIsShow: false,
            };
          });
          dispatch(setChannelsListAction(newChannelList));
        } else {
          dispatch(setChannelsListAction([]));
        }
      });
  }, []);

  const choseChannelAndJoinLive = (
    channelId: string,
    isVideo: RootStackParamList[HomeStackScreens.Live]['isVideo'],
  ) => {
    navigation.navigate(HomeStackScreens.Live, {
      type: LiveType.JOIN,
      channelId,
      isVideo,
    });
    dispatch(setJoinedAction(true));
  };

  const onCalloutPress = (channelId: string, isVideo: boolean) => {
    choseChannelAndJoinLive(channelId, isVideo);
    channelsList.forEach((channel) => {
      if (channel.channelId === channelId && channel.calloutIsShow) {
        dispatch(setShowCalloutAction({channelId, calloutIsShow: false}));
      }
    });
  };

  const allMarkers = channelsList.map((data) => {
    const {name, channelId, coords, isVideo, calloutIsShow} = data;
    const {latitude, longitude} = coords;

    return (
      <GoogleMapsMarker
        key={channelId}
        calloutIsShow={calloutIsShow}
        coordinate={{
          latitude,
          longitude,
        }}
        onCalloutPress={() => onCalloutPress(channelId, isVideo)}
        title={name}>
        <View style={styles.marker}>
          <Image
            source={
              isVideo
                ? require('../../../assets/images/video-camera.png')
                : require('../../../assets/images/sound-bars.png')
            }
            style={styles.markerImage}
            resizeMode="contain"
          />
        </View>
        <Callout style={styles.calloutStyle}>
          <TouchableOpacity key={channelId} style={styles.itemChannel}>
            <Text style={styles.markerText}>{name}</Text>
            <Text>{isVideo ? 'Video' : 'Audio'}</Text>
          </TouchableOpacity>
        </Callout>
      </GoogleMapsMarker>
    );
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          camera={{
            heading: 0,
            altitude: 0,
            pitch: 0,
            zoom: 10,
            center: coordinates,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          zoomControlEnabled={true}>
          {allMarkers}
        </MapView>
        <ModalCreatEvent
          changeModalVisible={changeModalVisible}
          isModalVisible={modalVisible}
          coordinates={currentGeolocation}
        />
        <View style={styles.createContainer}>
          <TouchableOpacity style={styles.button} onPress={changeModalVisible}>
            <Text style={styles.buttonText}>Create channel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
