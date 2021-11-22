import {EventInDatabases} from '../../../Components/ModalCreateEvent/types';
import {CallTypes} from '../types';
import {addZeroForMinutes} from './addZero';

export const arrayListData = (data: EventInDatabases[]) => {
  const dataForList = [];
  for (const key in data) {
    const time = new Date(data[key].dateTime);
    dataForList.push({
      id: key,
      time: `${time.getHours()}:${addZeroForMinutes(time.getMinutes())}`,
      type: data[key].video ? CallTypes.Video : CallTypes.Audio,
      name: data[key].name,
    });
  }
  return dataForList;
};
