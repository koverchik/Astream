import {EventInDatabases} from '../../Components/ModalCreateStream/types';

export type StreamType = {
  id: string;
  time: number;
  type: CallTypes;
  name: string;
};

export enum CallTypes {
  Audio = 'Audio',
  Video = 'Video',
  Chat = 'Chat',
}

export type FunctionSortByTimeType = (arr: StreamType[]) => StreamType[];

export type ArrayListDataType = (data: EventInDatabases[]) => StreamType[];
