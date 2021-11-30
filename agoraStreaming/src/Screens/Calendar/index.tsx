import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {DateData} from 'react-native-calendars/src/types';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';


import database from '@react-native-firebase/database';

import notifee from '@notifee/react-native';

import {CustomHeader} from '../../Components/Header';
import {HorizontalCalendar} from '../../Components/HorizontalCalendar';
import {DateInfoType} from '../../Components/HorizontalCalendar/types';
import {ModalCreatEvent} from '../../Components/ModalCreateStream';
import {EventInDatabases} from '../../Components/ModalCreateStream/types';
import {Stream} from '../../Components/Stream';
import {arrayListData} from './helpers/arrayListData';
import {
  TIME_NOTIFICATION,
  onCreateTriggerNotification,
} from './helpers/onCreateTriggerNotification';
import {styles} from './styles';
import {StreamType} from './types';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const ScreenCalendar: FC = () => {
  const dataSystem = new Date();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [streams, setStreams] = useState<StreamType[]>([]);
  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );

  const changeModalVisible = () => setModalVisible(!isModalVisible);

  const onPressDay = (day: DateData) => setChoseDay(day.dateString);
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const selectDay = (date: DateInfoType) => {
    setChoseDay(`${date.year}-${date.month}-${date.day}`);
  };


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
        <CustomHeader title={'Calendar'} />
        <TouchableOpacity
          onPress={changeModalVisible}
          style={styles.addNewEvent}>
          <FontAwesomeIcon icon={faPlus} color={'white'} size={18} />
        </TouchableOpacity>
        <HorizontalCalendar onDayPress={selectDay} activeDayColor={'#007eff'} />
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
            streams.map((item, index) => {
              return (
                <Stream
                  stream={item}
                  key={item.id}
                  translationY={translationY}
                  index={index}
                />
              );
            })
          ) : (
            <Text>No scheduled streams</Text>
          )}
        </Animated.ScrollView>
      </View>
    </View>
  );
};
