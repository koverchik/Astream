import {DateData} from 'react-native-calendars/src/types';

export type ModalCreatEventType = {
  day: DateData['dateString'];
  isModalVisible: boolean;
  changeModalVisible: () => void;
};

export type EventInDatabases = {
  name: string;
  video: boolean;
  dateTime: string;
};
