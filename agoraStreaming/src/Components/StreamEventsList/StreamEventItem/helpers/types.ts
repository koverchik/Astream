import {PlannedLiveEvent} from '../../../ModalCreateEvent/types';

export type EventsType = {
  [eventDate: string]: {
    [eventId: string]: PlannedLiveEvent;
  };
};
