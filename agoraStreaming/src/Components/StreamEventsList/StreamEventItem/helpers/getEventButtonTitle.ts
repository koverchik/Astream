import {StreamType} from '../../../../Screens/Calendar/types';
import {ButtonTitles} from '../types';

export const getEventButtonTitle = (
  channelId: StreamType['channelId'],
  eventIsOver: boolean,
  itsNotTimeYet: boolean,
) => {
  if (eventIsOver) {
    return ButtonTitles.END;
  }

  if (itsNotTimeYet) {
    return ButtonTitles.TIME;
  }

  if (channelId) {
    return ButtonTitles.ONLINE;
  } else {
    return ButtonTitles.OFFLINE;
  }
};
