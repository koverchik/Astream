import {EventInDatabases} from '../../../Components/ModalCreateEvent/types';
import {CallTypes, StreamType} from '../types';

const sortByTime = (arr: StreamType[]) => {
  return arr.sort((a: StreamType, b: StreamType) => (a.time > b.time ? 1 : -1));
};

export const arrayListData = (data: EventInDatabases[]): StreamType[] => {
  const dataForList = [];

  for (const key in data) {
    const time = Date.parse(data[key].dateTime);
    dataForList.push({
      id: key,
      time: time,
      type: data[key].video ? CallTypes.Video : CallTypes.Audio,
      name: data[key].name,
    });
  }
  sortByTime(dataForList);
  return dataForList;
};
