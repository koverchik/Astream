import {DateData} from 'react-native-calendars/src/types';

import {GeoType} from '../../Screens/Home/types';

export type ModalCreatEventType = {
  isModalVisible: boolean;
  changeModalVisible: () => void;

  day?: DateData['dateString'];
  coordinates?: GeoType;
};

export type EventInDatabasesType = {
  name: string;
  video: boolean;
  dateTime: string;
};
