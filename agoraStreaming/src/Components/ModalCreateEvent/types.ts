import {DateData} from 'react-native-calendars/src/types';

export type ModalCreatEventType = {
  day: DateData['dateString'];
};

export type eventInDatabases = {
  name: string;
  video: boolean;
  dateTime: string;
};
