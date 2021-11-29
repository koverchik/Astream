import {DateData} from 'react-native-calendars/src/types';
import {Region} from 'react-native-maps';

export type ModalCreatEventType = {
  isModalVisible: boolean;
  changeModalVisible: () => void;

  day?: DateData['dateString'];
  coordinates?: Region;
};

export type EventInDatabases = {
  name: string;
  video: boolean;
  dateTime: string;
};
