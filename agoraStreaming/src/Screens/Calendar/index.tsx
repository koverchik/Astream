import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';

import notifee from '@notifee/react-native';

import {CustomHeader} from '../../Components/Header';
import {HorizontalCalendar} from '../../Components/HorizontalCalendar';
import {DateInfoType} from '../../Components/HorizontalCalendar/types';
import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {EventInDatabases} from '../../Components/ModalCreateEvent/types';
import {StreamEventItem} from '../../Components/StreamEventItem';
import {
  HeaderInputPlaceholders,
  TabNavigation,
} from '../../Navigation/Tab/types';
import {InputEventType} from '../../Types/universalTypes';
import {arrayListData} from './helpers/arrayListData';
import {
  TIME_NOTIFICATION,
  onCreateTriggerNotification,
} from './helpers/onCreateTriggerNotification';
import {styles} from './styles';
import {
  CalendarScreenProps,
  StreamType,
  TabNavigationPropsProfileType,
} from './types';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const ScreenCalendar: FC<CalendarScreenProps> = () => {
  const navigation = useNavigation<TabNavigationPropsProfileType>();

  const dataSystem = new Date();
  const initDate = `${dataSystem.getFullYear()}-${
    dataSystem.getMonth() + 1
  }-${dataSystem.getDate()}`;

  const [streams, setStreams] = useState<StreamType[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [chosenDay, setChoseDay] = useState(initDate);

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
      const voidString = !textFromInput;
      setSearchValue(textFromInput);

      return matchFound && !voidString && stream;
    });
    setSearchResult(result);
  };

  const showData = () => {
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

  const renderClearButton = () => {
    return (
      !!searchValue && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onPressClearButton}>
          <FontAwesomeIcon icon={faTimes} color={'white'} size={18} />
        </TouchableOpacity>
      )
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View>
            <CustomHeader
              title={headerTitle}
              placeholderText={HeaderInputPlaceholders.CALENDAR}
              filter={onChangeSearchValue}
              searchMode={searchMode}
              onChangeSearchMode={activeSearchMode}
            />
            {renderClearButton()}
          </View>
        );
      },
    });
  }, [navigation, streams, searchValue, searchMode, headerTitle]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        data !== null ? setStreams(arrayListData(data)) : setStreams([]);
      });
  }, [chosenDay]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        notifee.getTriggerNotificationIds().then((ids) => {
          if (data !== null) {
            for (const key in data) {
              const dateTimeNotification =
                Date.parse(data[key].dateTime) - TIME_NOTIFICATION;
              if (
                Date.now() < dateTimeNotification &&
                ids.indexOf(key) === -1
              ) {
                onCreateTriggerNotification(
                  data[key].dateTime,
                  data[key].name,
                  key,
                );
              }
            }
          }
        });
      });
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <TouchableOpacity
            onPress={changeModalVisible}
            style={styles.addNewEvent}>
            <FontAwesomeIcon icon={faPlus} color={'white'} size={18} />
          </TouchableOpacity>
          <HorizontalCalendar
            onDayPress={selectDay}
            activeDayColor={'#007eff'}
          />
        </View>
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
          {streams.length ? (
            showData()?.map((item, index) => {
              return (
                <StreamEventItem
                  stream={item}
                  key={item.id}
                  translationY={translationY}
                  index={index}
                />
              );
            })
          ) : (
            <View style={styles.titleForEmptyListContainer}>
              <Text>No scheduled streams</Text>
            </View>
          )}
        </Animated.ScrollView>
      </View>
    </View>
  );
};
