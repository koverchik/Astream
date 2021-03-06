import React, {FC, useEffect, useRef, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import 'react-native-get-random-values';
import MapView from 'react-native-map-clustering';
import Map, {Callout, Camera, LatLng, PROVIDER_GOOGLE} from 'react-native-maps';

import {useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';

import {COLORS} from '../../Colors/colors';
import {GoogleMapsMarker} from '../../Components/GoogleMapsMarker';
import {CustomHeader} from '../../Components/Header';
import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {SearchResultList} from '../../Components/SearchResultList';
import {LiveType, MainStackScreens} from '../../Navigation/Stack/types';
import {
  HeaderInputPlaceholders,
  TabNavigation,
} from '../../Navigation/Tab/types';
import {
  setChannelsListAction,
  setShowCalloutAction,
} from '../../Redux/actions/HomeActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectChannelsList} from '../../Redux/selectors/HomeSelectors';
import {InputEventType} from '../../Types/universalTypes';
import {CallTypes} from '../Calendar/types';
import {StackNavigationPropLive} from '../Live/types';
import {addCallouts} from './helpers/addCallouts';
import {getImage} from './helpers/getImage';
import {requestPermissions} from './helpers/requestPermissions';
import {styles} from './style';
import {
  ChannelFromFirebaseType,
  DataForCloseChannelType,
  HomeScreenProps,
  ListChannelsType,
} from './types';

const INITIAL_COORDS = {
  latitude: 53.5078788,
  longitude: 27.0877321,
  latitudeDelta: 2,
  longitudeDelta: 0.009,
};

const cameraProperties: Camera = {
  heading: 0,
  altitude: 0,
  pitch: 0,
  zoom: 10,
  center: INITIAL_COORDS,
};

export const Home: FC<HomeScreenProps> = () => {
  const channelsList = useAppSelector(selectChannelsList);
  const mapRef = useRef<Map | null>(null);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [geolocation, setGeolocation] = useState<LatLng>(INITIAL_COORDS);
  const [channelListFirebase, setChannelListFirebase] = useState<
    ChannelFromFirebaseType[]
  >([]);

  const [searchResult, setSearchResult] = useState<ListChannelsType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchMode, setSearchMode] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationPropLive>();

  useEffect(() => {
    const newChannelList = addCallouts(channelListFirebase, channelsList);
    dispatch(setChannelsListAction(newChannelList));
  }, [channelListFirebase]);

  useEffect(() => {
    requestPermissions();
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setGeolocation({latitude, longitude});
      },
      () => {
        Alert.alert('Geolocation error');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    database()
      .ref('/channels')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const channelListFirebase: ChannelFromFirebaseType[] = Object.values(
            snapshot.val(),
          );

          setChannelListFirebase(channelListFirebase);
        } else {
          dispatch(setChannelsListAction([]));
        }
      });
  }, []);

  const onChangeSearchValue = (event: InputEventType) => {
    const result = channelsList.filter((channel) => {
      const textFromInput = event.nativeEvent.text;
      const matchFound = channel.name.includes(textFromInput);
      const stringIsNotEmpty = !!textFromInput;

      if (matchFound && stringIsNotEmpty) {
        return channel;
      }
    });
    setSearchResult(result);
  };

  const onPressResult = (stream: ListChannelsType) => {
    const {latitude, longitude} = stream.coords;
    const propertiesForShowCallout = {
      channelId: stream.channelId,
      calloutIsShow: true,
    };

    dispatch(setShowCalloutAction(propertiesForShowCallout));
    activeSearchMode();
    setSearchResult([]);

    mapRef.current?.animateCamera(
      {
        ...cameraProperties,
        center: {latitude, longitude},
      },
      {duration: 1500},
    );
  };

  const activeSearchMode = () => {
    setSearchMode((searchMode) => {
      if (searchMode) {
        setSearchValue('');
      }

      return !searchMode;
    });
  };

  const choseChannelAndJoinLive = (data: DataForCloseChannelType) => {
    const {channelId, isVideo} = data;

    navigation.navigate(MainStackScreens.Live, {
      type: LiveType.JOIN,
      channelId,
      isVideo,
    });
  };

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const onCalloutPress = (data: DataForCloseChannelType) => {
    const {channelId} = data;
    choseChannelAndJoinLive(data);

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
        onCalloutPress={() => onCalloutPress({channelId, isVideo})}
        title={name}>
        <View style={styles.marker}>
          <Image
            source={getImage(isVideo)}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </View>
        <Callout style={styles.calloutStyle}>
          <TouchableOpacity style={styles.itemChannel}>
            <Text style={styles.markerText}>{name}</Text>
            <Text>{isVideo ? CallTypes.Video : CallTypes.Audio}</Text>
          </TouchableOpacity>
        </Callout>
      </GoogleMapsMarker>
    );
  });

  const renderSearchResultList = () => {
    return (
      !!searchValue &&
      searchMode && (
        <SearchResultList
          searchResult={searchResult}
          onPressResult={onPressResult}
        />
      )
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CustomHeader
            title={TabNavigation.Home}
            placeholderText={HeaderInputPlaceholders.HOME}
            filter={onChangeSearchValue}
            inputValue={searchValue}
            onChangeInputText={setSearchValue}
            searchMode={searchMode}
            onChangeSearchMode={activeSearchMode}
          />
          {renderSearchResultList()}
        </View>
        <MapView
          initialRegion={INITIAL_COORDS}
          provider={PROVIDER_GOOGLE}
          clusterColor={COLORS.BABY_BLUE_EYES}
          camera={cameraProperties}
          ref={mapRef}
          zoomControlEnabled={true}
          onPress={onPressMap}
          style={styles.map}>
          {allMarkers}
        </MapView>
        <ModalCreatEvent
          changeModalVisible={changeModalVisible}
          isModalVisible={modalVisible}
          coordinates={geolocation}
        />
        <TouchableOpacity style={styles.button} onPress={changeModalVisible}>
          <Text style={styles.buttonText}>Create channel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
