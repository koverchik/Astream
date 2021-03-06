import React, {FC, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {LatLng} from 'react-native-maps';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import database from '@react-native-firebase/database';

import {COLORS} from '../../Colors/colors';
import {CustomHeader} from '../../Components/Header';
import {HorizontalCalendar} from '../../Components/HorizontalCalendar';
import {DateInfoType} from '../../Components/HorizontalCalendar/types';
import {IconButton} from '../../Components/IconButton';
import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {PlannedLiveEvent} from '../../Components/ModalCreateEvent/types';
import {StreamEventsList} from '../../Components/StreamEventsList';
import {
  HeaderInputPlaceholders,
  TabNavigation,
} from '../../Navigation/Tab/types';
import {InputEventType} from '../../Types/universalTypes';
import {arrayListData} from './helpers/arrayListData';
import {deleteOldEvents} from './helpers/deleteOldEvents';
import {getTriggerNotificationIds} from './helpers/getTriggerNotificationIds';
import {styles} from './styles';
import {CalendarScreenProps, StreamType} from './types';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

export const ScreenCalendar: FC<CalendarScreenProps> = () => {
  const dataSystem = new Date();
  const initDate = `${dataSystem.getFullYear()}-${
    dataSystem.getMonth() + 1
  }-${dataSystem.getDate()}`;

  const [streams, setStreams] = useState<StreamType[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [chosenDay, setChoseDay] = useState<string>(initDate);
  const [geolocation, setGeolocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const [searchResult, setSearchResult] = useState<StreamType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = useState<string>(
    TabNavigation.Calendar,
  );

  const changeModalVisible = () => setModalVisible(!isModalVisible);

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const selectDay = (date: DateInfoType) => {
    setSearchResult([]);
    setSearchValue('');
    setHeaderTitle(TabNavigation.Calendar);
    setChoseDay(`${date.year}-${date.month}-${date.day}`);
  };

  const onChangeSearchValue = (event: InputEventType) => {
    const result = streams.filter((stream) => {
      const textFromInput = event.nativeEvent.text;
      const matchFound = stream.name.includes(textFromInput);
      const stringIsNotEmpty = !!textFromInput;
      setSearchValue(textFromInput);

      return matchFound && stringIsNotEmpty && stream;
    });
    setSearchResult(result);
  };

  const dataForStreamEventList = () => {
    if (searchResult.length > 0 || (!searchResult.length && searchValue)) {
      return searchResult;
    }

    if (!searchResult.length && !searchValue) {
      return streams;
    }
  };

  const activeSearchMode = () => {
    setSearchMode((searchMode) => {
      if (searchValue) {
        setHeaderTitle(searchValue);
      }

      return !searchMode;
    });
  };

  const onPressClearButton = () => {
    setSearchValue('');
    setHeaderTitle(TabNavigation.Calendar);
    setSearchResult([]);
  };

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: PlannedLiveEvent[] = snapshot.val();
        data ? setStreams(arrayListData(data, chosenDay)) : setStreams([]);
      });
  }, [chosenDay]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: PlannedLiveEvent[] = snapshot.val();
        getTriggerNotificationIds(data);
      });

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

    deleteOldEvents();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <CustomHeader
          title={headerTitle}
          placeholderText={HeaderInputPlaceholders.CALENDAR}
          filter={onChangeSearchValue}
          searchMode={searchMode}
          onChangeSearchMode={activeSearchMode}
        />
        {!!searchValue && (
          <IconButton
            icon={faTimes}
            size={18}
            color={COLORS.WHITE}
            onPress={onPressClearButton}
            style={styles.clearButton}
          />
        )}
        <HorizontalCalendar
          onDayPress={selectDay}
          activeDayColor={COLORS.AZURE_RADIANCE}
        />
        {Date.parse(initDate) <= Date.parse(chosenDay) && (
          <IconButton
            icon={faPlus}
            size={18}
            color={COLORS.WHITE}
            onPress={changeModalVisible}
            style={styles.addNewEvent}
          />
        )}
        <ModalCreatEvent
          day={chosenDay}
          changeModalVisible={changeModalVisible}
          isModalVisible={isModalVisible}
        />
        <Animated.ScrollView
          style={styles.flatList}
          scrollEventThrottle={46}
          onScroll={scrollHandler}
          contentContainerStyle={styles.contentContainerStyle}>
          <StreamEventsList
            streams={streams}
            dataForStreamEventList={dataForStreamEventList()}
            geolocation={geolocation}
            translationY={translationY}
          />
        </Animated.ScrollView>
      </View>
    </View>
  );
};
