import notifee from '@notifee/react-native';
import database from '@react-native-firebase/database';
import React, {FC, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {EventInDatabases} from '../../Components/ModalCreateEvent/types';
import {Stream} from '../../Components/Stream';
import {arrayListData} from './helpers/arrayListData';
import {
  TIME_NOTIFICATION,
  onCreateTriggerNotification,
} from './helpers/onCreateTriggerNotification';
import {styles} from './styles';
import {StreamType} from './types';

export const ScreenCalendar: FC = () => {
  const dataSystem = new Date();

  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );

  const [streams, setStreams] = useState<StreamType[]>([]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .once('value')
      .then((snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        data != null ? setStreams(arrayListData(data)) : setStreams([]);
      });
  }, [chosenDay]);

  useEffect(() => {
    database()
      .ref(
        `/events/${`${dataSystem.getFullYear()}-${
          dataSystem.getMonth() + 1
        }-${dataSystem.getDate()}`}`,
      )
      .once('value')
      .then((snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        notifee.getTriggerNotificationIds().then((ids) => {
          if (data != null) {
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
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Calendar
          onDayPress={(day) => {
            setChoseDay(day.dateString);
          }}
          markedDates={{
            [chosenDay]: {
              selected: true,
              marked: true,
              selectedColor: '#FF7070',
            },
          }}
        />
        <ModalCreatEvent day={chosenDay} />
        <FlatList
          data={streams}
          style={styles.flatList}
          renderItem={({item}) => <Stream stream={item} />}
          keyExtractor={(item) => 'Stream' + item.id}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={<Text>No scheduled streams</Text>}
        />
      </View>
    </View>
  );
};
