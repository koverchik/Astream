import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

import {EventInDatabases} from '../../../Components/ModalCreateEvent/types';
import {addZeroForMinutes} from './addZero';

// Time notification in milliseconds (15 minutes)
export const TIME_NOTIFICATION = 900000;

export const onCreateTriggerNotification = async (
  dataTime: EventInDatabases['dateTime'],
  name: EventInDatabases['name'],
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
      title: name,
      id: key,
      body: `The meeting will be at ${dateEvent.getHours()}:${addZeroForMinutes(
        dateEvent.getMinutes(),
      )}`,
      android: {
        channelId: 'default',
      },
    },
    trigger,
  );
};
