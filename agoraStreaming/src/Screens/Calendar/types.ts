import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

import {EventInDatabasesType} from '../../Components/ModalCreateEvent/types';
import {TabNavigation, TabParamList} from '../../Navigation/Tab/types';

export type StreamType = {
  channelId: string | null;
  time: number;
  type: CallTypes;
  name: string;
  isVideo: boolean;
  eventId: string;
  chosenDay: string;
  eventIsOver: boolean;
};

export enum CallTypes {
  Audio = 'Audio',
  Video = 'Video',
  Chat = 'Chat',
}

export type CalendarScreenProps = {
  navigation: TabNavigationPropsProfileType;
  route: RouteProp<TabParamList, TabNavigation.Calendar>;
};

export type TabNavigationPropsProfileType = BottomTabNavigationProp<
  TabParamList,
  TabNavigation.Calendar
>;

export type FunctionSortByTimeType = (arr: StreamType[]) => StreamType[];

export type ArrayListDataType = (
  data: EventInDatabasesType[],
  chosenDay: string,
) => StreamType[];
