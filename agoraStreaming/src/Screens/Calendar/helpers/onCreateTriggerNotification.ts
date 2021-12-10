import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import {EventInDatabasesType} from '../../../Components/ModalCreateEvent/types';
import {addZeroForMinutes} from './addZero';

// Time notification in milliseconds (15 minutes)
export const TIME_NOTIFICATION = 900000;

export const onCreateTriggerNotification = async (
  dataTime: EventInDatabasesType['dateTime'],
  name: EventInDatabasesType['name'],
  key: string,
): Promise<void> => {
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
      id: key,
      title: name,
      body: `The meeting will be at ${dateEvent.getHours()}:${addZeroForMinutes(
        dateEvent.getMinutes(),
      )}`,
      android: {
        channelId: 'channelId',
        importance: AndroidImportance.HIGH,
        color: '#a5c5ec',
      },
    },
    trigger,
  );
};
