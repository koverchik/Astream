import notifee from '@notifee/react-native';

import {EventInDatabases} from '../../../Components/ModalCreateEvent/types';
import {
  TIME_NOTIFICATION,
  onCreateTriggerNotification,
} from './onCreateTriggerNotification';

export const getTriggerNotificationIds = async (data: EventInDatabases[]) => {
  const ids = await notifee.getTriggerNotificationIds();

  if (data) {
    for (const key in data) {
      const idIsNotFound = ids.indexOf(key) === -1;
      const dateTimeNotification =
        Date.parse(data[key].dateTime) - TIME_NOTIFICATION;

      if (Date.now() < dateTimeNotification && idIsNotFound) {
        await onCreateTriggerNotification(
          data[key].dateTime,
          data[key].name,
          key,
        );
      }
    }
  }
};
