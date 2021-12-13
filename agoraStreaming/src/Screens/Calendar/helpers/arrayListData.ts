import {
  ArrayListDataType,
  CallTypes,
  FunctionSortByTimeType,
  StreamType,
} from '../types';

const sortByTime: FunctionSortByTimeType = (arr) => {
  return arr.sort((a: StreamType, b: StreamType) => (a.time > b.time ? 1 : -1));
};

export const arrayListData: ArrayListDataType = (data, chosenDay) => {
  const dataForList: StreamType[] = [];

  for (const key in data) {
    const {video, name, dateTime, channelId} = data[key];
    const time = Date.parse(dateTime);

    dataForList.push({
      channelId: channelId ?? null,
      time,
      type: video ? CallTypes.Video : CallTypes.Audio,
      name,
      isVideo: video,
      eventId: key,
      chosenDay,
    });
  }
  sortByTime(dataForList);

  return dataForList;
};
