import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import database from '@react-native-firebase/database';
import React, {FC, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {EventInDatabases} from '../../Components/ModalCreateEvent/types';
import {addZeroForMinutes} from './helpers/addZero';

// Time notification in milliseconds (15 minutes)
const TIME_NOTIFICATION = 900000;
import {Stream} from '../../Components/Stream';
import {styles} from './styles';
import {CallTypes, StreamType} from './types';

export const ScreenCalendar: FC = () => {
  const dataSystem = new Date();

  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );
  const [keyNotification, setKeyNotification] = useState<string[]>([]);
    const [streams, setStreams] = useState<StreamType[]>([
        // TODO: Fake data for stream item
        {id: 322, time: '10:00 PM', type: CallTypes.Audio, name: 'Lol'},
        {id: 228, time: '11:00 AM', type: CallTypes.Video, name: 'Kek'},
        {id: 1239, time: '09:00 PM', type: CallTypes.Chat, name: 'Cheburek'},
        {id: 456, time: '10:00 PM', type: CallTypes.Video, name: 'Chik'},
        {id: 741, time: '05:00 AM', type: CallTypes.Video, name: 'Chik'},
        {id: 258, time: '10:00 AM', type: CallTypes.Video, name: 'Chik'},
        {id: 2342456, time: '10:00 PM', type: CallTypes.Audio, name: 'Chik'},
        {id: 354741, time: '05:00 AM', type: CallTypes.Video, name: 'Chik'},
        {id: 23458, time: '10:00 AM', type: CallTypes.Audio, name: 'Chik'},
        {id: 453456, time: '10:00 PM', type: CallTypes.Video, name: 'Chik'},
        {id: 73441, time: '05:00 AM', type: CallTypes.Video, name: 'Chik'},
        {id: 243558, time: '10:00 AM', type: CallTypes.Video, name: 'Chik'},
        {id: 434556, time: '10:00 PM', type: CallTypes.Video, name: 'Chik'},
        {id: 734541, time: '05:00 AM', type: CallTypes.Video, name: 'Chik'},
        {id: 254358, time: '10:00 AM', type: CallTypes.Video, name: 'Chik'},
    ]);
  const getKeyNotification = () => {
    notifee.getTriggerNotificationIds().then((ids) => setKeyNotification(ids));
  };

  database()
    .ref(`/events/${chosenDay}`)
    .once('value')
    .then((snapshot) => {
      getKeyNotification();
      const data: EventInDatabases[] = snapshot.val();
      if (data != null) {
        for (const key in data) {
          const dateTimeNotification =
            Date.parse(data[key].dateTime) - TIME_NOTIFICATION;
          if (
            Date.now() < dateTimeNotification &&
            keyNotification.indexOf(key) === -1
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

  const onCreateTriggerNotification = async (
    dataTime: EventInDatabases['dateTime'],
    name: EventInDatabases['name'],
    key: string,
  ) => {
    const dateNotification = new Date(dataTime);
    const dateEvent = new Date(dataTime);
    const dateTimeNotification = new Date(
      Date.parse(dataTime) - TIME_NOTIFICATION,
    );
    dateNotification.setHours(
      dateTimeNotification.getHours(),
      dateTimeNotification.getMinutes(),
    );

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: dateNotification.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: name,
        id: key,
        body: `The meeting will be at ${dateEvent.getHours()}:${addZeroForMinutes(
          dateEvent.getMinutes(),
        )}am`,
        android: {
          channelId: 'default',
        },
      },
      trigger,
    );
  };


  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Calendar
          onDayPress={(day) => {
            setChoseDay(day.dateString);
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
