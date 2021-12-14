import {EventInDatabasesType} from '../../ModalCreateEvent/types';

export type EventsType = {
  [date: string]: {
    [id: string]: EventInDatabasesType;
  };
};
