import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import database from '@react-native-firebase/database';
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {eventInDatabases} from '../../Components/ModalCreateEvent/types';

export const ScreenCalendar: FC = () => {
  const dataSystem = new Date();

  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );

  database()
    .ref(`/events/${chosenDay}`)
    .once('value')
    .then((snapshot) => {
      const data: eventInDatabases[] = snapshot.val();
      if (data != null) {
        for (const key in data) {
          const dateTimeNotification = Date.parse(data[key].dateTime) - 900000;
          if (Date.now() < dateTimeNotification) {
            onCreateTriggerNotification(data[key].dateTime, data[key].name);
          }
        }
      }
    });

  async function onCreateTriggerNotification(
    dataTime: eventInDatabases['dateTime'],
    name: eventInDatabases['name'],
  ) {
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
        body: `The meeting will be at ${dateEvent.getHours()}:${dateEvent.getMinutes()}am`,
        android: {
          channelId: 'default',
        },
      },
      trigger,
    );
  }
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
