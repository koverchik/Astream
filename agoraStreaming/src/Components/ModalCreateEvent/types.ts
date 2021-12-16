import {DateData} from 'react-native-calendars/src/types';
import {LatLng} from 'react-native-maps';

export type ModalCreatEventType = {
  isModalVisible: boolean;
  changeModalVisible: () => void;

  day?: DateData['dateString'];
  coordinates?: LatLng;
};

export type PlannedLiveEvent = {
  name: string;
  video: boolean;
  dateTime: string;
  eventIsOver: boolean;

  channelId?: string;
};
