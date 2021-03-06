import database from '@react-native-firebase/database';

import {getCurrentDate} from '../../../Components/HorizontalCalendar/helpers/getCurrentDate';
import {EventsType} from '../../../Components/StreamEventsList/StreamEventItem/helpers/types';

export const deleteOldEvents = async () => {
  const snapshot = await database().ref(`/events`).once('value');
  const events: EventsType = snapshot.val();

  const {currentYear, currentMonth, today} = getCurrentDate();
  const currentDate = `${currentYear}-${currentMonth}-${today + 1}`;

  for (const date in events) {
    if (Date.parse(date) < Date.parse(currentDate)) {
      await database().ref(`/events/${date}`).remove();
    }
  }
};
