import React, {FC, useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import 'react-native-get-random-values';
import MapView, {Callout, PROVIDER_GOOGLE, Region} from 'react-native-maps';

import database from '@react-native-firebase/database';

import {GoogleMapsMarker} from '../../Components/GoogleMapsMarker/GoogleMapsMarker';
import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {HomeStackScreens, LiveType} from '../../Navigation/Stack/types';
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
import {CallTypes} from '../Calendar/types';
import {addCallouts} from './Helpers/addCallouts';
import {getImage} from './Helpers/getImage';
import {requestPermissions} from './Helpers/requestPermissions';
import {styles} from './style';
import {
  ChannelsListFromFirebase,
  HomeScreenProps,
  ListChannelsType,
} from './types';

const INITIAL_COORDS = {
  latitude: 53.5078788,
  longitude: 27.0877321,
  latitudeDelta: 2,
  longitudeDelta: 0.009,
};

export const Home: FC<HomeScreenProps> = ({navigation}) => {
  const coordinates = useAppSelector(selectCoordinates);
  const channelsList = useAppSelector(selectChannelsList);
  const mapRef = useRef<MapView | null>(null);
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [geolocation, setGeolocation] = useState<Region>(INITIAL_COORDS);
  const [channelListFirebase, setChannelListFirebase] = useState<
    ChannelsListFromFirebase[]
  >([]);

  const cameraProperties = {
    heading: 0,
    altitude: 0,
    pitch: 0,
    zoom: 10,
    center: coordinates,
  };

  useEffect(() => {
    mapRef.current?.animateToRegion(coordinates);
  }, [coordinates]);

  useEffect(() => {
    const newChannelList = addCallouts(channelListFirebase, channelsList);
    dispatch(setChannelsListAction(newChannelList));
  }, [channelListFirebase]);

  useEffect(() => {
    requestPermissions();
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setGeolocation({...coordinates, latitude, longitude});
      },
      () => {
        dispatch(setCoordinatesAction(INITIAL_COORDS));
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    database()
      .ref('/channels')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const channelListFirebase: ChannelsListFromFirebase[] = Object.values(
            snapshot.val(),
          );

          setChannelListFirebase(channelListFirebase);
        } else {
          dispatch(setChannelsListAction([]));
        }
      });
  }, []);

  const choseChannelAndJoinLive = (
    channelId: ListChannelsType['channelId'],
    isVideo: ListChannelsType['isVideo'],
  ) => {
    navigation.navigate(HomeStackScreens.Live, {
      type: LiveType.JOIN,
      channelId,
      isVideo,
    });

    dispatch(setJoinedAction(true));
  };

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const onCalloutPress = (
    channelId: ListChannelsType['channelId'],
    isVideo: ListChannelsType['isVideo'],
  ) => {
    choseChannelAndJoinLive(channelId, isVideo);

    channelsList.forEach((channel) => {
      if (channel.channelId === channelId && channel.calloutIsShow) {
        dispatch(setShowCalloutAction({channelId, calloutIsShow: false}));
      }
    });
  };

  const onPressMarker = (channelId: ListChannelsType['channelId']) => {
    dispatch(setShowCalloutAction({channelId, calloutIsShow: true}));
  };

  const onPressMap = () => {
    const calloutIsShowId = channelsList.some((channel) => {
      return channel.calloutIsShow;
    });

    if (calloutIsShowId) {
      const newChannelList = channelsList.map((channel) => {
        return {...channel, calloutIsShow: false};
      });
      dispatch(setChannelsListAction(newChannelList));
    }
  };

  const allMarkers = channelsList.map((data) => {
    const {name, channelId, coords, isVideo, calloutIsShow} = data;
    const {latitude, longitude} = coords;

    return (
      <GoogleMapsMarker
        key={channelId}
        calloutIsShow={calloutIsShow}
        onPress={() => onPressMarker(channelId)}
        coordinate={{latitude, longitude}}
        onCalloutPress={() => onCalloutPress(channelId, isVideo)}
        title={name}>
        <View style={styles.marker}>
          <Image
            source={getImage(isVideo)}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </View>
        <Callout style={styles.calloutStyle}>
          <TouchableOpacity key={channelId} style={styles.itemChannel}>
            <Text style={styles.markerText}>{name}</Text>
            <Text>{isVideo ? CallTypes.Video : CallTypes.Audio}</Text>
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
          camera={cameraProperties}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onPress={onPressMap}
          zoomControlEnabled={true}>
          {allMarkers}
        </MapView>
        <ModalCreatEvent
          changeModalVisible={changeModalVisible}
          isModalVisible={modalVisible}
          coordinates={geolocation}
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
