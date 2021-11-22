import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import database from '@react-native-firebase/database';
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {eventInDatabases} from '../../Components/ModalCreateEvent/types';
import {addZeroForMinutes} from './helpers/addZero';

export const ScreenCalendar: FC = () => {
  const dataSystem = new Date();

  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );
  const [keyNotification, setKeyNotification] = useState<string[]>([]);

  const getKeyNotification = () => {
    notifee.getTriggerNotificationIds().then((ids) => setKeyNotification(ids));
  };

  database()
    .ref(`/events/${chosenDay}`)
    .once('value')
    .then((snapshot) => {
      getKeyNotification();
      const data: eventInDatabases[] = snapshot.val();
      if (data != null) {
        for (const key in data) {
          const dateTimeNotification = Date.parse(data[key].dateTime) - 900000;
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
    dataTime: eventInDatabases['dateTime'],
    name: eventInDatabases['name'],
    key: string,
  ) => {
    const dateNotification = new Date(dataTime);
    const dateEvent = new Date(dataTime);
    const dateTimeNotification = new Date(Date.parse(dataTime) - 900000);
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
    <View>
      <Calendar
        onDayPress={(day) => {
          setChoseDay(day.dateString);
        }}
      />
      <ModalCreatEvent day={chosenDay} />
    </View>
  );
};
