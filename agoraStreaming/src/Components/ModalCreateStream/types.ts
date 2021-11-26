import {DateData} from 'react-native-calendars/src/types';
import {Region} from 'react-native-maps';

export type ModalCreatEventType = {
  day?: DateData['dateString'];
  coordinates?: Region;
  isModalVisible: boolean;
  changeModalVisible: () => void;
};

export type EventInDatabases = {
  name: string;
  video: boolean;
  dateTime: string;
};
